import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowUp, ArrowRight, Star, X, CheckSquare, Sparkles, MessageSquare, Quote, Award } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useIsMobile } from './hooks/useIsMobile';

/* Core Immediate View Components */
import Navigation, { PageId } from './components/Navigation';
import HeroIllustration from './components/HeroIllustration';
import CardsRow from './components/CardsRow';
import SchoolTestimonialsSection from './components/SchoolTestimonialsSection';
import ReviewsSection from './components/ReviewsSection';
import ConnectSection from './components/ConnectSection';
import FooterSection from './components/FooterSection';
import InventraSection from './components/InventraSection';
import CollaborationSection from './components/CollaborationSection';
import CredentialsSection from './components/CredentialsSection';
import ConsultationModal from './components/ConsultationModal';
import SchoolDemoModal from './components/SchoolDemoModal';
import ActivityCenterModal from './components/ActivityCenterModal';
import ChatBot from './components/ChatBot';
import ServicesSection from './components/ServicesSection';
import ActivityCenterSection from './components/ActivityCenterSection';

/* Code-Split Lazy Loaded Subpages & Modals for High-Concurrency Performance */
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));
const MentorPage = lazy(() => import('./components/MentorPage'));
const CourseFinderModal = lazy(() => import('./components/CourseFinderModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));

export default function App() {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  /* Page Navigation State */
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'careers' || hash === 'mentor' || hash === 'about' || hash === 'collaboration') {
        return hash;
      }
    }
    return 'home';
  });

  /* Website Scroll Progress & Back-to-Top State */
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }
      setShowBackToTop(window.scrollY > 380);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'careers' || hash === 'mentor' || hash === 'about' || hash === 'collaboration') {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'home') {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Dialog Systems */
  const [authTab, setAuthTab] = useState<'login' | 'signup' | null>(null);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationMode, setConsultationMode] = useState<'activity_center' | 'stream_lab'>('stream_lab');
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);

  /* Bottom Cards Interaction State */
  const [activeCardDetails, setActiveCardDetails] = useState<string | null>(null);

  const handleOpenAuth = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
  };

  const handleOpenFinder = () => {
    setIsFinderOpen(true);
  };

  const handleCardClick = (type: string) => {
    setActiveCardDetails(type);
  };

  const handleEnrollCourse = (title: string) => {
    setEnrolledCourse(title);
    setTimeout(() => {
      setEnrolledCourse(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1A1A] flex flex-col font-sans select-text relative overflow-x-hidden">

      {/* TOP GLOWING READING SCROLL PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5A36] via-[#2563EB] to-[#FF5A36] z-[70] origin-left pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* BACKGROUND DECORATIONS (Soft, static ambient glow orbs - hidden on mobile to avoid GPU memory overhead) */}
      <div className="hidden md:block absolute top-0 right-0 w-[550px] h-[550px] bg-blue-400/6 rounded-full blur-[110px] -z-0 pointer-events-none gpu-accelerated" />
      <div className="hidden md:block absolute bottom-1/4 left-[-100px] w-[450px] h-[450px] bg-[#FF5A36]/6 rounded-full blur-[110px] -z-0 pointer-events-none gpu-accelerated" />
      <div className="hidden md:block absolute top-1/2 right-1/4 w-[380px] h-[380px] bg-amber-400/5 rounded-full blur-[100px] -z-0 pointer-events-none gpu-accelerated" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-100 pointer-events-none" />

      {/* STICKY TOP NAVIGATION BAR */}
      <Navigation
        onOpenAuth={handleOpenAuth}
        onOpenFinder={handleOpenFinder}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* PAGE CONTENT */}
      {currentPage === 'home' ? (
        <main className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 w-full pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-4 sm:pb-6 z-10">

          {/* TWO COLUMN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start flex-grow">

            {/* COLUMN 1: LEFT WRAPPER CONTENT (Heading, paragraph, buttons, bento stats) */}
            <div className="lg:col-span-7 flex flex-col justify-start h-full">
              <div className="max-w-2xl text-left">
                {/* MAIN HEADER TITLE */}
                <motion.h1
                  initial={isMobile ? false : { opacity: 0, y: 22 }}
                  animate={isMobile ? false : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  id="hero-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-ubuntu font-bold text-[#1A1A1A] tracking-tight leading-[1.1] mb-3 sm:mb-4 uppercase text-left"
                >
                  {t('hero.title1')} <br className="hidden sm:inline" />
                  {t('hero.title2')} <br />
                  <span className="text-[#FF5A36] font-ubuntu font-bold">{t('hero.title3')}</span>
                </motion.h1>

                {/* DESCRIPTION TEXT */}
                <motion.p
                  initial={isMobile ? false : { opacity: 0, y: 18 }}
                  animate={isMobile ? false : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-neutral-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed tracking-tight mb-4 sm:mb-5 max-w-xl text-left"
                >
                  {t('hero.subtitle')}
                </motion.p>

                {/* ACTION BUTTON TRIGGERS */}
                <motion.div
                  initial={isMobile ? false : { opacity: 0, y: 18 }}
                  animate={isMobile ? false : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-2 sm:mt-3 relative z-10"
                >
                  {/* Button 1: Book School Demo (Opens School STEAM Lab Lead Form) */}
                  <button
                    onClick={() => setIsSchoolModalOpen(true)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF5A36] hover:bg-[#E04E2D] hover:scale-102 active:scale-98 text-white font-ubuntu font-bold text-[15px] sm:text-base rounded-2xl border border-neutral-900/80 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{t('hero.bookSchoolDemo')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Button 2: Explore Our Solutions (Opens Activity Center Registration Form) */}
                  <button
                    onClick={() => setIsActivityModalOpen(true)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-neutral-50 hover:scale-102 active:scale-98 text-neutral-900 font-ubuntu font-bold text-[15px] sm:text-base rounded-2xl border-2 border-neutral-900/80 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{t('hero.exploreSolutions')}</span>
                    <Sparkles className="w-4 h-4 text-[#FF5A36]" />
                  </button>
                </motion.div>

                {/* IIT GUWAHATI TECHNOLOGY INNOVATION HUB COLLABORATION (PROMINENT & FREE-STANDING) */}
                <motion.div
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  animate={isMobile ? false : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="my-5 sm:my-6 flex items-center gap-5 sm:gap-7 text-left"
                >
                  {/* Left: Free-Standing Logo (No Box / Container) */}
                  <img
                    src="/iit-guwahati-tih-logo.png"
                    alt="Technology Innovation Hub - IIT Guwahati (IITG TIDF)"
                    className="h-20 sm:h-24 md:h-28 w-auto object-contain shrink-0 select-none hover:scale-103 transition-transform duration-300"
                  />

                  {/* Right: Partnership Details Beside Logo */}
                  <div className="flex flex-col justify-center text-left">
                    <span className="text-xs sm:text-sm font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-1">
                      {language === 'mr' ? 'अधिकृत सहकार्य' : 'In Collaboration With'}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-ubuntu font-extrabold text-neutral-900 tracking-tight leading-tight">
                      {language === 'mr'
                        ? 'आयआयटी गुवाहाटी इनोव्हेशन हब'
                        : 'IIT Guwahati Innovation Hub'}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-ubuntu text-neutral-600 font-semibold mt-1">
                      {language === 'mr'
                        ? 'टेक्नॉलॉजी इनोव्हेशन हब (IITG TIDF)'
                        : 'Technology Innovation Hub (IITG TIDF)'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* THREE CARDS COMPONENT AT BOT LEFT */}
              <div className="mt-3 lg:mt-4">
                <CardsRow onCardClick={handleCardClick} />
              </div>
            </div>

            {/* COLUMN 2: RIGHT ILLUSTRATION & AVATAR BANNER */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start relative w-full pt-3 sm:pt-5 lg:pt-8">

              {/* Home Screen Hero Image Space */}
              <div className="w-full relative mt-1 sm:mt-2 lg:mt-3">
                <HeroIllustration />
              </div>

            </div>

          </div>


          {/* COLLABORATION SECTION: Government Collaborations & Associated Schools */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <CollaborationSection />
          </motion.div>

          {/* SERVICES SECTION: Turnkey School STEAM Lab Setup */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <ServicesSection onConsultationClick={() => setIsSchoolModalOpen(true)} />
          </motion.div>

          {/* INVENTRA SECTION: Flagship Robotics Competition & Expo */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <InventraSection onParticipateClick={() => setIsSchoolModalOpen(true)} />
          </motion.div>

          {/* ROBOSTORMS ACTIVITY CENTER */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <ActivityCenterSection onEnrollClick={() => setIsActivityModalOpen(true)} />
          </motion.div>

          {/* Accredited and Recognized Credentials Section */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <CredentialsSection />
          </motion.div>

          {/* What School Owners Have to Say About Robostorms Testimonial Section */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <SchoolTestimonialsSection />
          </motion.div>

          {/* Dynamic Verification Student Testimonials consensus */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <ReviewsSection />
          </motion.div>

          {/* Connect with Robostorms interactive social channels */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 35 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-optimized-section"
          >
            <ConnectSection />
          </motion.div>

        </main>
      ) : currentPage === 'about' ? (
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#FF5A36] border-t-transparent rounded-full animate-spin" /></div>}>
          <AboutUsPage onBackToHome={() => handleNavigate('home')} />
        </Suspense>
      ) : currentPage === 'careers' ? (
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#FF5A36] border-t-transparent rounded-full animate-spin" /></div>}>
          <CareersPage onBackToHome={() => handleNavigate('home')} />
        </Suspense>
      ) : currentPage === 'mentor' ? (
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#FF5A36] border-t-transparent rounded-full animate-spin" /></div>}>
          <MentorPage onBackToHome={() => handleNavigate('home')} />
        </Suspense>
      ) : (
        /* BLANK PAGE VIEW (for careers / mentor) */
        <main className="flex-grow min-h-[75vh] w-full max-w-7xl mx-auto px-6 sm:px-12 py-12 flex flex-col justify-start">
          <div className="mb-6">
            <button
              onClick={() => handleNavigate('home')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-[#FF5A36] border border-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}</span>
            </button>
          </div>
        </main>
      )}

      {/* COMPREHENSIVE ENDING INFORMATION PAGE FOOTER with GeoLocations, Addresses & schedule desk */}
      <FooterSection
        onNavigate={setCurrentPage}
        onBookSchoolDemo={() => {
          setIsSchoolModalOpen(true);
        }}
      />

      {/* Enrolled Confirmation Toast Notification */}
      <AnimatePresence>
        {enrolledCourse && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-neutral-900 text-white rounded-2xl p-4 shadow-2xl border border-neutral-800 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5A36] text-white flex items-center justify-center font-bold text-sm select-none shrink-0">
              ✓
            </div>
            <div className="text-left pr-2">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A36]">Enrollment Process Initiated</h5>
              <p className="text-xs text-neutral-200 font-semibold mt-0.5 line-clamp-1">
                You registered for: {enrolledCourse}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">Our enrollment team will contact you within 2 working hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          POPUP MODALS AND SIDE DRAWERS PORTAL SECTION
          ======================================================== */}

      {/* 1. Auth Login / Sign Up Drawer Dialog */}
      <Suspense fallback={null}>
        <AuthModal
          isOpen={authTab !== null}
          onClose={() => setAuthTab(null)}
          initialTab={authTab ?? 'login'}
        />

        {/* 2. Interactive Match course finder questionnaire */}
        <CourseFinderModal
          isOpen={isFinderOpen}
          onClose={() => setIsFinderOpen(false)}
        />
      </Suspense>

      {/* 4. Interactive Bottom Card detail modal modals */}
      <AnimatePresence>
        {activeCardDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCardDetails(null)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-8 z-10 text-left text-neutral-900"
            >
              <button
                onClick={() => setActiveCardDetails(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-[#1A1A1A] bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Custom layouts matching card types clicked */}
              {(activeCardDetails === 'students' || activeCardDetails === 'reviews') && (
                <div>
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-150 text-[#FF5A36] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-1 font-ubuntu text-left">
                    5,00,000+ Students Engaged
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] mb-3 font-mono">
                    Through Structured STEAM Programs
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 text-left">
                    Over 5,00,000 students across hundreds of schools and activity centers have actively participated in our hands-on robotics, electronics, coding, and STEAM curriculum, transitioning from passive learners into creators of technology.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start mb-6">
                    {['Hands-on Robotics', 'Interactive Coding', 'Artificial Intelligence', 'Electronics & IoT', 'State Innovation Competitions'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveCardDetails(null);
                      setIsSchoolModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-[#FF5A36] hover:bg-[#E04E2D] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer font-sans"
                  >
                    {t('nav.bookCall')}
                  </button>
                </div>
              )}

              {(activeCardDetails === 'labs' || activeCardDetails === 'subjects') && (
                <div>
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-150 text-[#B59DFB] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-1 font-ubuntu text-left">
                    2,500+ Labs Established
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B59DFB] mb-3 font-mono">
                    In ZP & Municipal Schools
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 text-left">
                    Successfully deployed state-of-the-art STEAM labs in Zilla Parishad, municipal corporation schools, and private institutions, bringing cutting-edge hardware, robotic blueprint kits, and digital infrastructure to grassroots education.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start mb-6">
                    {['ZP School Labs', 'Municipal Schools', 'Model STEAM Centers', 'Hardware Diagnostics', 'Continuous Lab Support'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveCardDetails(null);
                      setIsSchoolModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-[#FF5A36] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer font-sans"
                  >
                    Explore Lab Setup
                  </button>
                </div>
              )}

              {(activeCardDetails === 'teachers' || activeCardDetails === 'courses') && (
                <div>
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-150 text-[#FFCD38] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-1 font-ubuntu text-left">
                    15,000+ Teachers Trained
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 font-mono">
                    Upskilled & Certified
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 text-left">
                    Comprehensive teacher enablement programs that equip educators with pedagogical techniques, hands-on module training, and continuous coaching to teach robotics and coding with confidence.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start mb-6">
                    {['Pedagogic Coaching', 'Hands-on Kits Training', 'Curriculum Mapping', 'Teacher Certification', 'Ongoing Technical Support'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveCardDetails(null);
                      setIsSchoolModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-[#FF5A36] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer font-sans"
                  >
                    Teacher Training Programs
                  </button>
                </div>
              )}

              {activeCardDetails === 'atl' && (
                <div>
                  <div className="w-12 h-12 bg-[#FF5A36]/10 border border-[#FF5A36]/20 text-[#FF5A36] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-1 font-ubuntu text-left">
                    ATL & STEAM Labs Implemented
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF5A36] mb-3 font-mono">
                    Turnkey Implementation & Mentorship
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 text-left">
                    End-to-end setup and academic alignment for Atal Tinkering Labs (ATL) and STEAM facilities. We take care of lab design, component supply, student challenge roadmaps, and continuous compliance.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start mb-6">
                    {['ATL Compliance', 'STEAM Blueprint Design', 'Hardware Procurement', 'Challenge Roadmaps', 'CSR Alignment'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveCardDetails(null);
                      setIsSchoolModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-[#FF5A36] hover:bg-[#E04E2D] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer font-sans"
                  >
                    Consult on ATL Setup
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCHOOL DEMO & LAB SETUP LEAD MODAL */}
      <SchoolDemoModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
      />

      {/* ACTIVITY CENTER REGISTRATION MODAL */}
      <ActivityCenterModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />

      {/* BACKWARD COMPATIBLE CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultMode={consultationMode}
      />

      <ChatBot
        onOpenConsultation={() => setIsSchoolModalOpen(true)}
      />

      {/* FLOATING SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-20 right-5 sm:bottom-6 sm:right-24 z-40 p-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md text-neutral-700 hover:text-[#FF5A36] hover:border-[#FF5A36]/40 hover:shadow-lg transition-all cursor-pointer group"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-neutral-800 group-hover:text-[#FF5A36]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
