import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle, 
  GraduationCap, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoReview {
  id: string;
  videoUrl: string;
  posterUrl: string;
  name: string;
  nameMr: string;
  role: string;
  roleMr: string;
  type: 'student' | 'parent';
  rating: number;
  duration: string;
  comment: string;
  commentMr: string;
  tag: string;
  tagMr: string;
}

export default function ReviewsSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [globalMuted, setGlobalMuted] = useState(true);
  const { language } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 5 Real Videos from User
  const videoReviews: VideoReview[] = [
    {
      id: 'vid-samarath',
      videoUrl: '/videos/review-1.mp4',
      posterUrl: '/videos/review-1-thumb.jpg',
      name: 'Samarath Ahuja',
      nameMr: 'समर्थ आहुजा',
      role: 'Student',
      roleMr: 'विद्यार्थी',
      type: 'student',
      rating: 5,
      duration: '0:20',
      comment: 'Robostorms taught me how to code and build working robots. The mentors make learning technology so much fun and easy!',
      commentMr: 'रोबोस्टॉर्म्समध्ये मला रोबोटिक्स आणि कोडिंग शिकायला खूप मजा येते. मार्गदर्शक प्रत्येक संकल्पना खूप सोप्या पद्धतीने समजावून सांगतात!',
      tag: 'Young Innovator',
      tagMr: 'नवसंशोधक विद्यार्थी'
    },
    {
      id: 'vid-sudhir',
      videoUrl: '/videos/review-2.mp4',
      posterUrl: '/videos/review-2-thumb.jpg',
      name: 'Sudhir Ahuja',
      nameMr: 'सुधीर आहुजा',
      role: 'Student',
      roleMr: 'विद्यार्थी',
      type: 'student',
      rating: 5,
      duration: '0:40',
      comment: 'Connecting circuits and sensors to create real automated projects inspired me to become a future AI & Robotics engineer.',
      commentMr: 'विविध सेन्सर्स आणि सर्किट्स जोडून रोबोट चालवणं मला खूप आवडलं. मला भविष्यात एआय व रोबोटिक्स इंजिनिअर व्हायचं आहे.',
      tag: 'Future Engineer',
      tagMr: 'भविष्यातील तंत्रज्ञ'
    },
    {
      id: 'vid-shivani',
      videoUrl: '/videos/review-3.mp4',
      posterUrl: '/videos/review-3-thumb.jpg',
      name: 'Shivani Naidu',
      nameMr: 'शिवानी नायडू',
      role: 'Parent of Bhupesh Naidu',
      roleMr: 'भूपेश नायडू यांची पालक',
      type: 'parent',
      rating: 5,
      duration: '0:31',
      comment: 'Seeing Bhupesh develop genuine scientific curiosity and practical hands-on confidence with Robostorms has been truly wonderful.',
      commentMr: 'भूपेशमध्ये रोबोस्टॉर्म्समुळे विज्ञानाची आणि तंत्रज्ञानाची प्रत्यक्ष प्रात्यक्षिकांसह खरी आवड आणि आत्मविश्वास निर्माण झाला आहे.',
      tag: 'Parent Review',
      tagMr: 'पालक मनोगत'
    },
    {
      id: 'vid-keyaan',
      videoUrl: '/videos/review-4.mp4',
      posterUrl: '/videos/review-4-thumb.jpg',
      name: 'Keyaan Patel',
      nameMr: 'कियान पटेल',
      role: 'Student',
      roleMr: 'विद्यार्थी',
      type: 'student',
      rating: 5,
      duration: '0:40',
      comment: 'I assembled a motorized ferris wheel project using Robostorms components! It gave me the skills to invent whatever I imagine.',
      commentMr: 'मी स्वतः मोटार व गिअर्स वापरून रोबोस्टॉर्म्स कॉम्पोनंट्ससह हे फिरणारे मॉडेल बनवले! यामुळे माझी कल्पकता प्रत्यक्षात आली.',
      tag: 'Hands-on Builder',
      tagMr: 'प्रायोगिक निर्माता'
    },
    {
      id: 'vid-gayatri',
      videoUrl: '/videos/review-5.mp4',
      posterUrl: '/videos/review-5-thumb.jpg',
      name: 'Gayatri Sadharkar',
      nameMr: 'गायत्री सधार्कर',
      role: 'Parent of Rishak Sadharkar',
      roleMr: 'ऋषक सधार्कर यांची पालक',
      type: 'parent',
      rating: 5,
      duration: '0:31',
      comment: 'Robostorms structured curriculum and patient mentors have made a big difference in Rishak\'s analytical and problem-solving abilities.',
      commentMr: 'रोबोस्टॉर्म्सच्या मार्गदर्शनामुळे ऋषकच्या विचार करण्याच्या पद्धतीत आणि तार्किक निर्णयक्षमतेत लक्षणीय प्रगती दिसून आली आहे.',
      tag: 'Parent Perspective',
      tagMr: 'पालक प्रतिक्रिया'
    }
  ];

  // Observe section visibility for scroll-down automatic playback
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle horizontal scroll snapping and detection of active video
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth >= 640 ? 320 : 280;
    const newIndex = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      videoReviews.length - 1
    );
    if (newIndex !== activeVideoIndex) {
      setActiveVideoIndex(newIndex);
    }
  }, [activeVideoIndex, videoReviews.length]);

  const scrollToVideo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('.video-card-item');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      setActiveVideoIndex(index);
    }
  };

  const scrollPrev = () => {
    const prev = Math.max(0, activeVideoIndex - 1);
    scrollToVideo(prev);
  };

  const scrollNext = () => {
    const next = Math.min(videoReviews.length - 1, activeVideoIndex + 1);
    scrollToVideo(next);
  };

  return (
    <section 
      ref={sectionRef}
      id="reviews" 
      className="w-full py-20 bg-[#FAF9F5] border-t border-neutral-200 relative overflow-hidden"
    >
      {/* Background radial accent - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF5A36]/6 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* SECTION HEADER */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span id="reviews-transform-badge" className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-[10px] font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
              <Video className="w-3.5 h-3.5" />
              {language === 'mr' ? 'प्रत्यक्ष व्हिडिओ मनोगत व अनुभव' : 'Authentic Video Reviews & Stories'}
            </span>

            <h2 id="reviews-main-title" className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-extrabold text-[#1A1A1A] tracking-tight uppercase leading-tight max-w-4xl text-center">
              {language === 'mr' ? (
                <>
                  पालक आणि विद्यार्थ्यांचे <span className="text-[#FF5A36]">मनोगत</span>
                </>
              ) : (
                <>
                  WHAT <span className="text-[#FF5A36]">PARENTS & STUDENTS</span> HAVE TO SAY?
                </>
              )}
            </h2>

            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl text-center font-medium">
              {language === 'mr' 
                ? 'रोबोस्टॉर्म्समुळे विद्यार्थ्यांच्या कौशल्यात आणि आत्मविश्वासात झालेला सकारात्मक बदल जाणून घ्या.' 
                : 'Watch real testimonials from students and parents sharing how Robostorms robotics and coding labs transformed their learning journey.'}
            </p>

            <div className="h-1.5 w-16 bg-[#FF5A36] mt-4" />
          </motion.div>
        </div>

        {/* ========================================================
            SIDE-SCROLLABLE VIDEO TESTIMONIALS CAROUSEL
            ======================================================== */}
        <div className="mb-12">
          {/* Carousel Left / Right Navigation Controls */}
          <div className="flex items-center justify-end mb-4 px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={activeVideoIndex === 0}
                aria-label="Previous video"
                className="w-10 h-10 rounded-full bg-white border border-neutral-300 hover:border-[#FF5A36] hover:bg-[#FFEBE5]/40 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-neutral-300 transition-all flex items-center justify-center text-neutral-800 hover:text-[#FF5A36] shadow-sm cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={activeVideoIndex === videoReviews.length - 1}
                aria-label="Next video"
                className="w-10 h-10 rounded-full bg-white border border-neutral-300 hover:border-[#FF5A36] hover:bg-[#FFEBE5]/40 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-neutral-300 transition-all flex items-center justify-center text-neutral-800 hover:text-[#FF5A36] shadow-sm cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videoReviews.map((review, idx) => (
              <div 
                key={review.id} 
                className="video-card-item snap-center shrink-0 w-[290px] sm:w-[320px] md:w-[340px]"
              >
                <VideoPlayerCard
                  review={review}
                  isActive={isSectionInView && activeVideoIndex === idx}
                  isSectionInView={isSectionInView}
                  language={language}
                  globalMuted={globalMuted}
                  setGlobalMuted={setGlobalMuted}
                  onSelectThis={() => setActiveVideoIndex(idx)}
                />
              </div>
            ))}
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {videoReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToVideo(idx)}
                aria-label={`Go to video ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeVideoIndex === idx 
                    ? 'w-8 h-2 bg-[#FF5A36]' 
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Cohesive overall feedback footer */}
        <div className="max-w-xl mx-auto p-4 bg-white border border-neutral-200 flex items-center justify-center gap-6 sm:gap-8 flex-col sm:flex-row text-center sm:text-left rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 select-none leading-none">
            <CheckCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
            <span className="text-xs sm:text-sm font-ubuntu font-bold text-neutral-800 leading-none">
              {language === 'mr' ? '९८.६% पालक समाधान दर' : '98.6% Parent Satisfaction Rating'}
            </span>
          </div>
          <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
          <div className="flex items-center gap-2 select-none leading-none">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none">
              {language === 'mr' ? 'सत्यापित अभ्यासक्रम अभिप्राय' : 'Verified Learning Feedback'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// INDIVIDUAL VIDEO CARD COMPONENT
// Features:
// - Automatic playback when scrolled into view
// - Vertical reel/story aspect ratio (9:16)
// - Center Pause & Resume button appearing when video is fully played or paused
// - Scrubbable progress bar with current & total time
// - Prominent Mute/Unmute audio toggle
// - High-end styling matching Robostorms brand
// ============================================================================

interface VideoPlayerCardProps {
  review: VideoReview;
  isActive: boolean;
  isSectionInView: boolean;
  language: string;
  globalMuted: boolean;
  setGlobalMuted: (muted: boolean) => void;
  onSelectThis: () => void;
}

function VideoPlayerCard({
  review,
  isActive,
  isSectionInView,
  language,
  globalMuted,
  setGlobalMuted,
  onSelectThis
}: VideoPlayerCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Synchronize muted state with globalMuted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = globalMuted;
    }
  }, [globalMuted]);

  // Autoplay management:
  // When active card and section are in view, play automatically!
  // When inactive or section out of view, pause!
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isSectionInView) {
      video.muted = globalMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasEnded(false);
          })
          .catch(() => {
            video.muted = true;
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isSectionInView, globalMuted]);

  // Play / Pause Toggle handler
  const togglePlayPause = (e?: MouseEvent) => {
    e?.stopPropagation();
    onSelectThis();

    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      video.currentTime = 0;
      setHasEnded(false);
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  // Video ended handler: triggers the Pause & Resume / Replay buttons!
  const handleEnded = () => {
    setHasEnded(true);
    setIsPlaying(false);
  };

  // Click on timeline scrubber to seek
  const handleScrub = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (hasEnded) {
      setHasEnded(false);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      onClick={togglePlayPause}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#FF5A36] transition-all duration-300 cursor-pointer flex flex-col justify-between select-none"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={review.videoUrl}
        poster={review.posterUrl}
        playsInline
        muted={globalMuted}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 z-10 pointer-events-none" />

      {/* ========================================================
          TOP BAR OVERLAY: BADGE + AUDIO UNMUTE TOGGLE
          ======================================================== */}
      <div className="relative z-20 p-4 flex items-center justify-between w-full">
        {/* Badge: Student or Parent */}
        <span 
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-ubuntu font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${
            review.type === 'student'
              ? 'bg-[#FF5A36]/90 text-white border-white/20'
              : 'bg-white/90 text-neutral-900 border-white/40'
          }`}
        >
          {review.type === 'student' ? (
            <GraduationCap className="w-3 h-3" />
          ) : (
            <UserCheck className="w-3 h-3 text-[#FF5A36]" />
          )}
          <span>{language === 'mr' ? review.tagMr : review.tag}</span>
        </span>

        {/* Audio Mute / Unmute Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setGlobalMuted(!globalMuted);
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold backdrop-blur-md border transition-all cursor-pointer ${
            globalMuted
              ? 'bg-black/60 text-amber-300 border-amber-300/40 hover:bg-black/80'
              : 'bg-[#FF5A36] text-white border-white/30 hover:bg-[#e04f2f]'
          }`}
        >
          {globalMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span className="hidden sm:inline">Audio On</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================
          CENTER OVERLAY: PAUSE & RESUME BUTTONS
          - Appears when video has ended (Replay/Resume)
          - Appears when paused (Resume button)
          - Appears on hover when playing (Pause button)
          ======================================================== */}
      <div className="relative z-20 flex-grow flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {/* STATE 1: VIDEO FULLY PLAYED (ENDED) -> PROMINENT RESUME / REPLAY BUTTON */}
          {hasEnded && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex flex-col items-center gap-3 bg-black/75 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-lg shadow-[#FF5A36]/40 hover:scale-105 active:scale-95 transition-transform">
                <RotateCcw className="w-7 h-7" />
              </div>
              <div className="leading-tight">
                <span className="text-white text-sm font-ubuntu font-bold block uppercase tracking-wider">
                  {language === 'mr' ? 'व्हिडिओ पुन्हा पहा' : 'Replay / Resume'}
                </span>
                <span className="text-[10px] text-neutral-300 font-mono block mt-0.5">
                  {language === 'mr' ? 'सुरू करण्यासाठी टॅप करा' : 'Click to resume video'}
                </span>
              </div>
            </motion.div>
          )}

          {/* STATE 2: PAUSED (NOT ENDED) -> RESUME BUTTON */}
          {!isPlaying && !hasEnded && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/25 shadow-xl hover:bg-black/85 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-md">
                <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
              </div>
              <span className="text-white text-xs font-ubuntu font-bold uppercase tracking-wider">
                {language === 'mr' ? 'सुरू करा' : 'Resume'}
              </span>
            </motion.div>
          )}

          {/* STATE 3: PLAYING & HOVERED -> PAUSE BUTTON */}
          {isPlaying && !hasEnded && isHovered && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center">
                <Pause className="w-4 h-4" />
              </div>
              <span className="text-white text-xs font-ubuntu font-bold uppercase tracking-wider">
                {language === 'mr' ? 'थांबवा' : 'Pause'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================
          BOTTOM OVERLAY: SPEAKER DETAILS + PROGRESS SCRUBBER
          ======================================================== */}
      <div className="relative z-20 p-4 pt-2 flex flex-col gap-2.5">
        
        {/* Quote snippet */}
        <p className="text-white/95 text-xs font-medium leading-snug line-clamp-2 drop-shadow-md">
          "{language === 'mr' ? review.commentMr : review.comment}"
        </p>

        {/* Speaker Name, Role & Star Rating */}
        <div className="flex items-end justify-between border-t border-white/15 pt-2.5">
          <div className="text-left">
            <span className="text-white font-ubuntu font-bold text-sm sm:text-base block leading-tight drop-shadow-sm">
              {language === 'mr' ? review.nameMr : review.name}
            </span>
            <span className="text-[11px] text-white/75 font-medium block mt-0.5 leading-none">
              {language === 'mr' ? review.roleMr : review.role}
            </span>
          </div>

          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
        </div>

        {/* Timeline Scrubber & Time Display */}
        <div className="pt-1 flex flex-col gap-1">
          <div
            ref={progressBarRef}
            onClick={handleScrub}
            className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all relative"
          >
            <div
              className="h-full bg-[#FF5A36] rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/70 px-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{review.duration}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
