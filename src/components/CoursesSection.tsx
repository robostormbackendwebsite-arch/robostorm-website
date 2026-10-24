import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Star, BookOpen, Users, Check, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data';
import { useLanguage } from '../context/LanguageContext';

interface CoursesSectionProps {
  onEnrollClick: (courseTitle: string) => void;
}

export default function CoursesSection({ onEnrollClick }: CoursesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { language, t, tCourse } = useLanguage();

  // Get unique subjects
  const categories = ['All', ...Array.from(new Set(COURSES.map(c => c.subject)))];

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return language === 'mr' ? 'सर्व कोर्सेस' : 'All';
    if (cat === 'Robotics & Coding') return language === 'mr' ? 'रोबोटिक्स आणि कोडिंग' : 'Robotics & Coding';
    if (cat === 'Basic Electronics') return language === 'mr' ? 'बेसिक इलेक्ट्रॉनिक्स' : 'Basic Electronics';
    if (cat === 'Internet of Things (IoT)') return language === 'mr' ? 'इंटरनेट ऑफ थिंग्स' : 'Internet of Things (IoT)';
    if (cat === 'AR & VR Lab') return language === 'mr' ? 'AR आणि VR लॅब' : 'AR & VR Lab';
    if (cat === 'Web App Development') return language === 'mr' ? 'वेब ॲप विकास' : 'Web App Development';
    if (cat === 'Computer Science') return language === 'mr' ? 'संगणक शास्त्र' : 'Computer Science';
    if (cat === 'Creative Design') return language === 'mr' ? 'क्रिएटिव्ह डिझाइन' : 'Creative Design';
    return cat;
  };

  const getLevelLabel = (level: string) => {
    if (language === 'mr') {
      if (level === 'Beginner') return 'प्राथमिक';
      if (level === 'Intermediate') return 'मध्यम';
      if (level === 'Advanced') return 'प्रगत';
    }
    return level;
  };

  // Filtering logic
  const filteredCourses = COURSES.filter(course => {
    const translatedCourse = tCourse(course);
    const matchesCategory = activeCategory === 'All' || course.subject === activeCategory;
    const matchesSearch = translatedCourse.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          translatedCourse.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses-catalog" className="w-full py-16 border-t border-neutral-200 mt-12 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-xs font-bold uppercase tracking-widest text-[#FF5A36] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            {language === 'mr' ? 'अमर्याद ज्ञान सक्षमीकरण' : 'Empowering Knowledge'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-neutral-900 tracking-tight leading-none text-left">
            {t('courses.title')}
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-3 max-w-xl font-sans text-left leading-relaxed">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder={language === 'mr' ? 'कोर्सेस, मेंटर्स शोधा...' : 'Search courses, mentors...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF5A36] focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-ubuntu font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
              activeCategory === category
                ? 'bg-[#FF5A36] text-white border-[#FF5A36] shadow-md'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const tc = tCourse(course);
            return (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={course.image}
                    alt={tc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/services/stem-lab-robotics-kit.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/45 to-transparent" />
                  
                  {/* Level Tag (Top Left) */}
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm border border-neutral-200 text-[10px] font-black uppercase tracking-wider text-neutral-800 rounded-lg shadow-sm">
                      {getLevelLabel(course.level)}
                    </span>
                    <span className="px-2.5 py-1 bg-[#FF5A36] border border-[#FF5A36] text-[10px] font-black uppercase tracking-wider text-white rounded-lg shadow-sm">
                      {getCategoryLabel(course.subject)}
                    </span>
                  </div>

                  {/* Rating (Bottom Left) */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-950/80 backdrop-blur-sm text-[11px] font-bold text-amber-400 rounded-lg">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {course.rating.toFixed(1)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  {/* Duration Line */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 mb-3 font-mono uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-left shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#FF5A36]" />
                      {language === 'mr' ? `${tc.duration.replace('Weeks', 'आठवडे').replace('Week', 'आठवडा')}` : tc.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-left shrink-0">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      {course.students} {language === 'mr' ? 'विद्यार्थी' : 'students'}
                    </span>
                  </div>

                  <h3 className="text-lg font-ubuntu font-bold text-neutral-900 group-hover:text-[#FF5A36] transition-colors leading-snug line-clamp-2 mb-3 text-left">
                    {tc.title}
                  </h3>

                  <p className="text-neutral-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6 text-left">
                    {tc.description}
                  </p>

                  {/* Card Footer Divider */}
                  <div className="border-t border-neutral-100 my-4" />

                  {/* Course Details Action Link */}
                  <div className="flex items-center justify-end mt-auto w-full">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-3.5 bg-neutral-950 hover:bg-[#FF5A36] text-white hover:text-white border border-neutral-900 hover:border-[#FF5A36] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 font-sans"
                    >
                      <span>{language === 'mr' ? 'अभ्यासक्रम तपशील पहा' : 'View course syllabus'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-neutral-800 font-ubuntu">{t('courses.noMatching')}</h4>
          <p className="text-neutral-500 text-sm mt-1">{language === 'mr' ? 'शोध संज्ञा बदलून पहा किंवा फिल्टर रिसेट करा.' : 'Try resetting filters or typing another search keyword.'}</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-5 py-2.5 bg-neutral-950 hover:bg-[#FF5A36] text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            {language === 'mr' ? 'फिल्टर साफ करा' : 'Clear Filters'}
          </button>
        </div>
      )}

      {/* Expanded Course Detail Dialog */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-neutral-950/45 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 z-10 text-left text-neutral-900 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors shadow-sm cursor-pointer"
              >
                <XBtn />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Course Image */}
                <div className="md:col-span-5">
                  <div className="h-44 md:h-full w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/services/stem-lab-robotics-kit.jpg';
                      }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-7 flex flex-col justify-between text-left">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/10 text-[9px] font-black uppercase text-[#FF5A36] rounded-md tracking-wider">
                        {getCategoryLabel(selectedCourse.subject)}
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-[9px] font-black uppercase text-neutral-700 rounded-md tracking-wider">
                        ★ {selectedCourse.rating.toFixed(1)}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 leading-tight mb-2 text-left">
                      {tCourse(selectedCourse).title}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 text-left">
                      {tCourse(selectedCourse).description}
                    </p>

                    {/* Syllabus Bullet Highlights */}
                    <div className="space-y-2 mb-6 text-left">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-left">
                        {language === 'mr' ? 'तुम्ही याद्वारे प्राप्त कराल:' : 'What you will achieve:'}
                      </h4>
                      <div className="grid grid-cols-1 gap-1.5 text-left">
                        <span className="text-xs text-neutral-700 flex items-center gap-2 text-left">
                          <Check className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          {language === 'mr' ? 'अभ्यासक्रम पूर्ण केल्याचे प्रमाणित प्रमाणपत्र' : 'Verified certificate of study completion'}
                        </span>
                        <span className="text-xs text-neutral-700 flex items-center gap-2 text-left">
                          <Check className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          {language === 'mr' ? '१:१ पोर्टफोलिओ प्रकल्पाचे दुरुस्ती मार्गदर्शन' : '1-on-1 portfolio project correction'}
                        </span>
                        <span className="text-xs text-neutral-700 flex items-center gap-2 text-left">
                          <Check className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          {language === 'mr' ? 'साहित्याचा आयुष्यभर अमर्याद प्रवेश' : 'Full lifelong access to curriculum materials'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enroll Simulation Button Trigger */}
                  <button
                    onClick={() => {
                      onEnrollClick(tCourse(selectedCourse).title);
                      setSelectedCourse(null);
                    }}
                    className="w-full py-4 bg-[#FF5A36] hover:bg-[#E04E2D] text-white font-ubuntu font-bold text-sm uppercase tracking-wider rounded-none cursor-pointer font-sans"
                  >
                    {language === 'mr' 
                      ? `आता प्रवेश घ्या (${selectedCourse.duration.replace('Weeks', 'आठवडे').replace('Week', 'आठवडा')})` 
                      : `Enroll in ${selectedCourse.duration} Program`}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function XBtn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
