import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import RobostormsLogo from './RobostormsLogo';
import { useLanguage } from '../context/LanguageContext';

export type PageId = 'home' | 'careers' | 'mentor' | 'about' | 'collaboration';

interface NavigationProps {
  onOpenAuth: (tab: 'login' | 'signup') => void;
  onOpenFinder: () => void;
  onOpenConsultation: () => void;
  currentPage?: PageId;
  onNavigate?: (page: PageId) => void;
}

export default function Navigation({
  onOpenAuth,
  onOpenFinder,
  onOpenConsultation,
  currentPage = 'home',
  onNavigate
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="relative z-40 bg-[#FAF9F5] border-b border-neutral-200 px-6 sm:px-12 py-4 sm:py-5 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE: LOGO + NAV LINKS WITH CLEAR GAP */}
        <div className="flex items-center">
          {/* LOGO */}
          <div
            onClick={() => {
              if (onNavigate) {
                onNavigate('home');
              } else {
                onOpenFinder();
              }
            }}
            className="cursor-pointer shrink-0 mr-8 sm:mr-10 lg:mr-12 xl:mr-14 flex items-center"
          >
            <RobostormsLogo />
          </div>

          {/* DESKTOP NAV ITEMS (ALIGNED TO LEFT SIDE WITH AMPLE BREATHING ROOM FROM LOGO) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 font-bold text-xs uppercase tracking-widest text-neutral-600">
            {/* Home Link */}
            <button
              onClick={() => onNavigate?.('home')}
              className={`py-2 transition-colors cursor-pointer text-left relative ${currentPage === 'home' ? 'text-[#FF5A36] font-extrabold' : 'hover:text-neutral-900'
                }`}
            >
              <span>{t('nav.home')}</span>
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5A36] rounded-full" />
              )}
            </button>


            {/* Collaboration Link (Smooth scrolls to collaboration on home page) */}
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('collaboration');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('collaboration');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 transition-colors cursor-pointer text-left relative hover:text-neutral-900"
            >
              <span>{t('nav.collaboration')}</span>
            </button>

            {/* Services Link (Smooth scrolls to services section on home page) */}
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 transition-colors cursor-pointer text-left relative hover:text-neutral-900"
            >
              <span>{t('nav.services')}</span>
            </button>

            {/* Inventra Link */}
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('inventra');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('inventra');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 transition-colors cursor-pointer text-left relative hover:text-neutral-900"
            >
              <span>{t('nav.inventra')}</span>
            </button>

            {/* Reviews Link (Smooth scrolls to reviews section on home page) */}
            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('reviews');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('reviews');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-2 transition-colors cursor-pointer text-left relative hover:text-neutral-900"
            >
              <span>{t('nav.reviews')}</span>
            </button>

            {/* Careers Link (Opens Career Page) */}
            <button
              onClick={() => onNavigate?.('careers')}
              className={`py-2 transition-colors cursor-pointer text-left relative ${currentPage === 'careers' ? 'text-[#FF5A36] font-extrabold' : 'hover:text-neutral-900'
                }`}
            >
              <span>{t('nav.careers')}</span>
              {currentPage === 'careers' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5A36] rounded-full" />
              )}
            </button>

            {/* Mentor Link (Opens Mentor Page) */}
            <button
              onClick={() => onNavigate?.('mentor')}
              className={`py-2 transition-colors cursor-pointer text-left relative ${currentPage === 'mentor' ? 'text-[#FF5A36] font-extrabold' : 'hover:text-neutral-900'
                }`}
            >
              <span>{t('nav.mentor')}</span>
              {currentPage === 'mentor' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5A36] rounded-full" />
              )}
            </button>

            {/* About Us Link (Opens About Us Page) */}
            <button
              onClick={() => onNavigate?.('about')}
              className={`py-2 transition-colors cursor-pointer text-left relative ${currentPage === 'about' ? 'text-[#FF5A36] font-extrabold' : 'hover:text-neutral-900'
                }`}
            >
              <span>{t('nav.aboutUs')}</span>
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5A36] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex lg:hidden items-center gap-3">
          {/* MOBILE BURGER BAR */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 hover:text-neutral-600 bg-white rounded-full border border-neutral-200 shadow-sm transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE POPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-200 p-6 flex flex-col gap-4 shadow-xl z-50 animate-fade-in text-neutral-800">
          <div className="flex flex-col gap-2 text-left">
            {/* Home */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('home');
              }}
              className={`text-left py-3.5 px-4 border border-neutral-100 font-bold uppercase text-xs tracking-widest transition-colors ${currentPage === 'home' ? 'bg-[#FFEBE5] text-[#FF5A36]' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                }`}
            >
              {t('nav.home')}
            </button>


            {/* Collaboration Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('collaboration');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('collaboration');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-left py-3.5 px-4 bg-neutral-50 border border-neutral-100 font-bold uppercase text-xs tracking-widest text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {t('nav.collaboration')}
            </button>

            {/* Services Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-left py-3.5 px-4 bg-neutral-50 border border-neutral-100 font-bold uppercase text-xs tracking-widest text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {t('nav.services')}
            </button>

            {/* Inventra Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('inventra');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('inventra');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-left py-3.5 px-4 bg-neutral-50 border border-neutral-100 font-bold uppercase text-xs tracking-widest text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {t('nav.inventra')}
            </button>

            {/* Reviews Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage !== 'home') {
                  onNavigate?.('home');
                  setTimeout(() => {
                    const el = document.getElementById('reviews');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('reviews');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-left py-3.5 px-4 bg-neutral-50 border border-neutral-100 font-bold uppercase text-xs tracking-widest text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {t('nav.reviews')}
            </button>

            {/* Careers */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('careers');
              }}
              className={`text-left py-3.5 px-4 border border-neutral-100 font-bold uppercase text-xs tracking-widest transition-colors ${currentPage === 'careers' ? 'bg-[#FFEBE5] text-[#FF5A36]' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                }`}
            >
              {t('nav.careers')}
            </button>

            {/* Mentor */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('mentor');
              }}
              className={`text-left py-3.5 px-4 border border-neutral-100 font-bold uppercase text-xs tracking-widest transition-colors ${currentPage === 'mentor' ? 'bg-[#FFEBE5] text-[#FF5A36]' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                }`}
            >
              {t('nav.mentor')}
            </button>

            {/* About Us */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('about');
              }}
              className={`text-left py-3.5 px-4 border border-neutral-100 font-bold uppercase text-xs tracking-widest transition-colors ${currentPage === 'about' ? 'bg-[#FFEBE5] text-[#FF5A36]' : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                }`}
            >
              {t('nav.aboutUs')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
