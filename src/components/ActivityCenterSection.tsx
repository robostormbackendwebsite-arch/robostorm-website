import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Code2, Cpu, Sparkles, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ActivityCenterSectionProps {
  onEnrollClick?: () => void;
}

export default function ActivityCenterSection({ onEnrollClick }: ActivityCenterSectionProps) {
  const { language } = useLanguage();

  const photos = [
    {
      src: '/activity-center-1.jpg',
      alt: 'Robostorms young innovators with modular robotics kits',
      titleEn: 'Young Innovators & Robotics Kits',
      titleMr: 'विद्यार्थी व रोबोटिक्स किट्स',
      captionEn: 'Students proudly showcasing their modular robotics building components and custom electronics trays.',
      captionMr: 'मॉड्युलर रोबोटिक्स किट्स आणि इलेक्ट्रॉनिक्ससह विद्यार्थी प्रत्यक्ष प्रोजेक्ट्स तयार करताना.'
    },
    {
      src: '/activity-center-2.jpg',
      alt: 'Smart board guided coding and robot assembly in activity center',
      titleEn: 'Smart Screen Guided Learning',
      titleMr: 'स्मार्ट पॅनेल मार्गदर्शन व असेंब्ली',
      captionEn: 'Interactive smart boards guide children step-by-step through 3D mechanics and visual coding.',
      captionMr: 'मोठ्या स्मार्ट स्क्रीनद्वारे ३D मेकॅनिक्स व व्हिज्युअल कोडिंगचे सोपे व टप्प्याटप्प्याने प्रशिक्षण.'
    },
    {
      src: '/activity-center-3.jpg',
      alt: 'Spacious robotics lab with students building rovers and smart machines',
      titleEn: 'Collaborative Rover Lab',
      titleMr: 'आधुनिक रोव्हर लॅब',
      captionEn: 'Bright, state-of-the-art laboratory where children collaborate in teams to construct motorized rovers.',
      captionMr: 'प्रशस्त, सुसज्ज लॅबमध्ये मुले एकत्र येऊन स्वयंचलित रोव्हर्स आणि मशिनरी डिझाइन करतात.'
    },
    {
      src: '/activity-center-4.jpg',
      alt: 'Hands-on mechanical engineering and wiring with screwdrivers and tools',
      titleEn: 'Hands-on Mechanical Crafting',
      titleMr: 'मेकॅनिकल व हार्डवेअर क्राफ्टिंग',
      captionEn: 'Real engineering tools, screwdrivers, gears, and circuitry—building confidence through tactile creation.',
      captionMr: 'प्रत्यक्ष टूल्स, स्क्रू-ड्रायव्हर्स, गिअर्स व सर्किट्स हाताळून मुले इंजिनिअरिंगची कौशल्ये आत्मसात करतात.'
    }
  ];

  return (
    <section
      id="activity-center"
      className="w-full pt-14 sm:pt-20 pb-16 sm:pb-24 border-t border-neutral-200 text-left relative overflow-hidden"
    >
      {/* Ambient background glows - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="max-w-4xl mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-xs font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'प्रत्यक्ष इनोव्हेशन लॅब' : 'HANDS-ON INNOVATION LAB'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-neutral-900 leading-tight tracking-tight mb-4">
          {language === 'mr' ? (
            <>
              रोबोस्टॉर्म्स <span className="text-[#FF5A36]">अ‍ॅक्टिव्हिटी सेंटर</span>
            </>
          ) : (
            <>
              Robostorms <span className="text-[#FF5A36]">Activity Center</span>
            </>
          )}
        </h2>

        <p className="text-neutral-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
          {language === 'mr'
            ? 'जिथे मुले पुस्तकी ज्ञानापलीकडे जाऊन प्रत्यक्ष कोडिंग, रोबोटिक्स, सेन्सर्स आणि इंजिनिअरिंग प्रयोगांची जादू स्वतःच्या हातांनी अनुभवतात.'
            : 'Where young minds discover the magic of coding, robotics, and creative engineering through real-world hands-on experiments.'}
        </p>
      </div>

      {/* PARAGRAPH-BASED EDITORIAL CONTENT (No excessive boxes or cluttered containers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-14 sm:mb-16">
        
        {/* Left Column: Flowing Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-neutral-700 text-base sm:text-lg leading-relaxed">
          <p>
            {language === 'mr' ? (
              <>
                <strong>रोबोस्टॉर्म्स अ‍ॅक्टिव्हिटी सेंटर</strong> हे शालेय विद्यार्थ्यांसाठी एक अत्याधुनिक तंत्रज्ञान केंद्र आहे, जिथे मुलांना कोडिंग (Coding), रोबोटिक्स (Robotics), इलेक्ट्रॉनिक्स आणि सायन्स प्रोजेक्ट्सचे प्रत्यक्ष व प्रात्यक्षिक प्रशिक्षण दिले जाते. येथे मुले केवळ स्क्रीनवर कोडिंग पाहत नाहीत, तर स्क्रू-ड्रायव्हर्स, गिअर्स, मोटर्स, सेन्सर्स आणि कंट्रोलर्सचा वापर करून स्वतःचे रोबोट्स, स्मार्ट कार्स आणि स्वयंचलित यंत्रे तयार करतात.
              </>
            ) : (
              <>
                The <strong>Robostorms Activity Center</strong> is a state-of-the-art experiential workspace where children explore practical robotics, block and visual coding, electronics, and mechanical engineering. Rather than passive screen time, students actively work with real motors, microcontrollers, sensory modules, and chassis kits to build interactive rovers, automated gadgets, and working invention prototypes.
              </>
            )}
          </p>

          {/* 1. STUDENT LEARNING LEVELS (Junior Std 1-4 & Senior Std 5-9) */}
          <div className="pt-1">
            <h3 className="text-lg sm:text-xl font-ubuntu font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#FF5A36]" />
              <span>{language === 'mr' ? 'प्रवेश स्तर व वयोगट (Learning Levels)' : 'Student Learning Levels'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {/* Junior Level */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-[#FF5A36]/40 transition-all text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-[#FFEBE5] text-[#FF5A36] text-[11px] font-ubuntu font-bold rounded-full uppercase tracking-wider">
                    {language === 'mr' ? 'कनिष्ठ स्तर' : 'Junior Level'}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-700">
                    {language === 'mr' ? 'इयत्ता १ ली ते ४ थी' : 'Std 1st to 4th'}
                  </span>
                </div>
                <h4 className="font-ubuntu font-bold text-neutral-900 text-sm sm:text-base mb-1">
                  {language === 'mr' ? 'इयत्ता १ ली ते ४ थी (Junior)' : 'Junior Innovators (Std 1–4)'}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === 'mr'
                    ? 'पायाभूत रोबोटिक्स, सेन्सर्स, मेकॅनिकल मॉडेल्स आणि सोपे व्हिज्युअल ब्लॉक कोडिंगचे आनंददायी शिक्षण.'
                    : 'Foundational STEM robotics, modular building kits, sensory basics, and playful visual block coding.'}
                </p>
              </div>

              {/* Senior Level */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-[#FF5A36]/40 transition-all text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 text-[11px] font-ubuntu font-bold rounded-full uppercase tracking-wider">
                    {language === 'mr' ? 'वरिष्ठ स्तर' : 'Senior Level'}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-700">
                    {language === 'mr' ? 'इयत्ता ५ वी ते ९ वी' : 'Std 5th to 9th'}
                  </span>
                </div>
                <h4 className="font-ubuntu font-bold text-neutral-900 text-sm sm:text-base mb-1">
                  {language === 'mr' ? 'इयत्ता ५ वी ते ९ वी (Senior)' : 'Senior Engineers (Std 5–9)'}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === 'mr'
                    ? 'अर्डिनो मायक्रोकंट्रोलर्स, सर्किट्स, ॲडव्हान्स कोडिंग, सेन्सर्स, IoT आणि राज्यस्तरीय स्पर्धा तयारी.'
                    : 'Arduino microcontrollers, circuit electronics, Python/text coding, IoT systems, and competition robotics.'}
                </p>
              </div>
            </div>
          </div>

          {/* 2. BATCH TIMINGS & SCHEDULES (Weekday & Weekend) */}
          <div className="pt-1">
            <h3 className="text-lg sm:text-xl font-ubuntu font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FF5A36]" />
              <span>{language === 'mr' ? 'बॅचेस आणि वेळापत्रक (Batch Timings)' : 'Batch Timings & Schedule'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
              {/* Weekday Batches */}
              <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 text-left">
                <div className="flex items-center gap-2 text-[#FF5A36] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{language === 'mr' ? 'आठवड्यातील बॅच (Weekday)' : 'Weekday Batch'}</span>
                </div>
                <h4 className="font-ubuntu font-bold text-neutral-900 text-sm sm:text-base">
                  {language === 'mr' ? 'सोमवार आणि मंगळवार' : 'Monday & Tuesday'}
                </h4>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900">
                  <Clock className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>4:00 PM – 6:00 PM</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                  {language === 'mr' ? 'दररोज २ तासांचे प्रत्यक्ष लॅब मार्गदर्शन सत्र' : '2-hour focused hands-on practical session'}
                </p>
              </div>

              {/* Weekend Batches */}
              <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 text-left">
                <div className="flex items-center gap-2 text-[#FF5A36] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{language === 'mr' ? 'शनिवार-रविवार बॅच (Weekend)' : 'Weekend Batch'}</span>
                </div>
                <h4 className="font-ubuntu font-bold text-neutral-900 text-sm sm:text-base mb-2">
                  {language === 'mr' ? 'शनिवार आणि रविवार' : 'Saturday & Sunday'}
                </h4>
                <div className="flex flex-col gap-1.5">
                  <div className="inline-flex items-center justify-between px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900">
                    <span className="text-neutral-500 font-sans font-semibold text-[11px]">{language === 'mr' ? 'शनिवार:' : 'Saturday:'}</span>
                    <span className="text-[#FF5A36]">4:00 PM – 6:00 PM</span>
                  </div>
                  <div className="inline-flex items-center justify-between px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900">
                    <span className="text-neutral-500 font-sans font-semibold text-[11px]">{language === 'mr' ? 'रविवार:' : 'Sunday:'}</span>
                    <span className="text-[#FF5A36]">10:00 AM – 2:00 PM</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                  {language === 'mr' ? 'शालेय अभ्यासावर परिणाम न होता प्रगत रोबोटिक्स शिक्षण' : 'Comprehensive lab work without clashing with school hours'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Focus Points & Direct Action */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-neutral-50/80 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 text-left">
            <span className="text-xs font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36] block mb-2 font-mono">
              {language === 'mr' ? 'कौशल्य विकास' : 'Core Disciplines Covered'}
            </span>
            <h4 className="text-xl font-ubuntu font-bold text-neutral-900 mb-4">
              {language === 'mr' ? 'मुले काय शिकतील?' : 'What Children Master at the Center'}
            </h4>

            <div className="space-y-3.5 text-sm font-medium text-neutral-700">
              <div className="flex items-start gap-3">
                <Code2 className="w-4 h-4 text-[#FF5A36] mt-1 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? 'कोडिंग व अल्गोरिदम्स:' : 'Block & Text Coding:'}</strong>{' '}
                  {language === 'mr' ? 'स्क्रॅच, ब्लॉक कोडिंग आणि पायथनचे मूलभूत तत्त्वे.' : 'Scratch, logic sequences, and foundational algorithmic thinking.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="w-4 h-4 text-[#FF5A36] mt-1 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? 'इलेक्ट्रॉनिक्स व सेन्सर्स:' : 'Circuitry & Sensors:'}</strong>{' '}
                  {language === 'mr' ? 'अर्डिनो, मायक्रो-कंट्रोलर्स, अल्ट्रासोनिक आणि IR सेन्सर्स.' : 'Arduino microcontrollers, ultrasonic, IR sensors & breadboards.'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#FF5A36] mt-1 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? 'लहान बॅचेस, वैयक्तिक लक्ष:' : 'Small Batches & 1:1 Attention:'}</strong>{' '}
                  {language === 'mr' ? 'प्रत्येक विद्यार्थ्यावर वैयक्तिक लक्ष व प्रत्यक्ष मार्गदर्शन.' : 'Strict student-to-mentor ratios ensure every child builds confidently.'}
                </span>
              </div>
            </div>

            {/* Enroll / Call to Action Button */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <button
                onClick={onEnrollClick}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF5A36] hover:bg-[#E04E2D] active:scale-98 text-white text-sm font-ubuntu font-bold rounded-2xl transition-all cursor-pointer shadow-sm group"
              >
                <span>
                  {language === 'mr'
                    ? 'अ‍ॅक्टिव्हिटी सेंटरसाठी जागा आरक्षित करा'
                    : 'Enroll for Weekday / Weekend Batches'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
                {language === 'mr' ? 'मर्यादित जागा उपलब्ध • सर्व उपकरणांचा समावेश' : 'Limited Seats Per Batch • All Kits Provided'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* REAL PHOTOGRAPHY SHOWCASE (Clean, unboxed photo grid with natural captions) */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
              {language === 'mr' ? 'अ‍ॅक्टिव्हिटी सेंटरमधील प्रत्यक्ष क्षण' : 'Inside the Robostorms Activity Center'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              {language === 'mr' ? 'आमच्या सेंटरमधील विद्यार्थी, प्रोजेक्ट्स व कार्यशाळेची काही छायाचित्रे' : 'Real photos of young inventors learning, coding, and building robots in our lab.'}
            </p>
          </div>
        </div>

        {/* 4-Photo Grid: Clean, elegant, natural layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group flex flex-col text-left transition-all duration-300"
            >
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/3] border border-neutral-200/90 shadow-2xs group-hover:shadow-lg transition-all duration-300">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 select-none"
                  loading="lazy"
                />
              </div>

              {/* Text Caption Directly Under Photo */}
              <div className="pt-3">
                <h4 className="text-sm font-ubuntu font-bold text-neutral-900 group-hover:text-[#FF5A36] transition-colors leading-snug">
                  {language === 'mr' ? item.titleMr : item.titleEn}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                  {language === 'mr' ? item.captionMr : item.captionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
