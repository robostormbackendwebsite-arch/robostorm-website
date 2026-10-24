import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Lightbulb, Users, Compass, Cpu, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InventraSectionProps {
  onParticipateClick?: () => void;
  inventraPhoto?: string;
}

const inventraPhotos = [
  { id: 1, image: '/inventra/inventra-1.jpg' },
  { id: 2, image: '/inventra/inventra-2.jpg' },
  { id: 3, image: '/inventra/inventra-3.jpg' },
  { id: 4, image: '/inventra/inventra-4.jpg' },
  { id: 5, image: '/inventra/inventra-5.jpg' },
];

export default function InventraSection({ onParticipateClick }: InventraSectionProps) {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Tripled array to create a seamless infinite loop: after 5, 1 appears continuously
  const infiniteSlides = [
    ...inventraPhotos.map((s) => ({ ...s, uniqueKey: `set0-${s.id}` })),
    ...inventraPhotos.map((s) => ({ ...s, uniqueKey: `set1-${s.id}` })),
    ...inventraPhotos.map((s) => ({ ...s, uniqueKey: `set2-${s.id}` })),
  ];

  const highlights = [
    {
      icon: Lightbulb,
      label: t('inventra.tag1'),
    },
    {
      icon: Users,
      label: t('inventra.tag2'),
    },
    {
      icon: Cpu,
      label: t('inventra.tag3'),
    },
    {
      icon: Compass,
      label: t('inventra.tag4'),
    },
  ];

  // Initialize scroll position to the middle set for seamless infinite scrolling
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
      }
    }, 50);

    const handleInfiniteScroll = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth <= 0) return;

      // Loop right: if scrolled into the 3rd set, seamlessly reset to middle set
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      }
      // Loop left: if scrolled into the 1st set, seamlessly reset to middle set
      else if (container.scrollLeft <= 5) {
        container.scrollLeft += singleSetWidth;
      }
    };

    container.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector('[data-slide-card="true"]') as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 20 : 350; // card width + 20px gap
    const singleSetWidth = container.scrollWidth / 3;

    if (direction === 'right' && container.scrollLeft >= singleSetWidth * 2 - cardStep) {
      container.scrollLeft -= singleSetWidth;
    } else if (direction === 'left' && container.scrollLeft <= cardStep) {
      container.scrollLeft += singleSetWidth;
    }

    container.scrollBy({
      left: direction === 'right' ? cardStep : -cardStep,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="inventra"
      className="w-full pt-4 sm:pt-6 pb-8 border-t border-neutral-200 mt-2 sm:mt-3 text-left relative overflow-hidden"
    >
      {/* Subtle ambient lighting - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/3 right-10 w-[450px] h-[450px] bg-orange-400/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 left-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* TOP ROW: INFORMATION & MAIN STILL INVENTRA PHOTO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT COLUMN: LOGO, DESCRIPTION, HIGHLIGHTS & PARTICIPATE ACTION */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* FREE-STANDING INVENTRA LOGO */}
          <div className="mb-4 sm:mb-5 flex items-center">
            <img
              src="/inventra-logo.png"
              alt="Robostorms Inventra"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain shrink-0 select-none hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Description Text */}
          <p className="text-neutral-700 text-base sm:text-lg lg:text-[19px] font-normal leading-relaxed mb-6 max-w-2xl">
            {t('inventra.desc')}
          </p>

          {/* Key Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-none text-neutral-800 text-xs sm:text-sm font-semibold hover:border-[#FF5A36]/30 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#FFEBE5] text-[#FF5A36] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Action: Direct Google Form Link */}
          <div className="pt-2">
            <a
              href="https://forms.gle/FLL5jx1tVRgDwqGC8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#FF5A36] hover:bg-[#E04E2D] active:scale-98 text-white font-ubuntu font-bold text-sm sm:text-base rounded-xl border border-neutral-900/60 transition-all cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#FF5A36]/25 group"
            >
              <span>{t('inventra.participate')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN STILL INVENTRA PHOTO (PERMANENT FIXED IMAGE) */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <div
            className="w-full max-w-[480px] h-[300px] sm:h-[340px] lg:h-[370px] bg-neutral-100 rounded-2xl border-2 border-neutral-900 shadow-md relative select-none overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
            onClick={() => setLightboxPhoto('/inventra/inventra-main.jpg')}
          >
            <img
              src="/inventra/inventra-main.jpg"
              alt="Inventra Grand Event"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM IMAGE SCROLLER: CLEAN SCROLLING PHOTOS */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-neutral-200/60 relative">
        {/* Scroller Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
              {t('inventra.galleryTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {t('inventra.gallerySub')}
            </p>
          </div>

          {/* Desktop Left/Right Controls Header */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous slides"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next slides"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Floating Arrow buttons */}
        <div className="relative group/carousel">
          {/* Floating Right Navigation Arrow */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-neutral-800 shadow-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Floating Left Navigation Arrow */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-neutral-800 shadow-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Horizontal Infinite Scroll Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {infiniteSlides.map((slide) => (
              <div
                key={slide.uniqueKey}
                data-slide-card="true"
                onClick={() => setLightboxPhoto(slide.image)}
                className="w-[280px] sm:w-[320px] md:w-[360px] h-[240px] sm:h-[260px] md:h-[280px] shrink-0 snap-start bg-neutral-100 rounded-2xl border-2 border-neutral-200/90 shadow-sm overflow-hidden select-none transition-all duration-300 hover:shadow-lg hover:border-[#FF5A36]/60 cursor-pointer group"
              >
                <img
                  src={slide.image}
                  alt="Inventra event photo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col cursor-default"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#FF5A36] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxPhoto}
              alt="Inventra Event Full View"
              className="w-full max-h-[85vh] object-contain bg-black rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
