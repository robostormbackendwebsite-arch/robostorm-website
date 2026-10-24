import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RobostormsLogo from './RobostormsLogo';

interface FooterSectionProps {
  onBookSchoolDemo?: () => void;
  onNavigate?: (page: 'home' | 'careers' | 'mentor' | 'about') => void;
}

export default function FooterSection({ onBookSchoolDemo, onNavigate }: FooterSectionProps = {}) {
  const { language, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    if (onNavigate) {
      onNavigate('home');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-6 sm:mt-8 py-12 sm:py-14 text-left relative overflow-hidden z-10">

      {/* Decorative vectors in footer background */}
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">

          {/* Corporate Profile Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* BRAND HEADER */}
              <div className="mb-6">
                <RobostormsLogo size="md" />
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium">
                {t('footer.mission')}
              </p>

              {/* Active Accredited Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('footer.partner')}</span>
              </div>

              {/* Official Social Links */}
              <div className="flex items-center gap-2.5 mt-5">
                <a
                  href="https://www.linkedin.com/company/robostorms-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Robostorms on LinkedIn"
                  title="Connect on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#0A66C2] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/robostorms_tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Robostorms on Instagram"
                  title="Follow @robostorms_tech on Instagram"
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#E1306C] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/robostorms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Robostorms on Facebook"
                  title="Connect on Facebook"
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#1877F2] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@RobostormsTechnologyAcademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Robostorms on YouTube"
                  title="Watch on YouTube"
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#FF0000] text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Our Services / Solutions Column */}
          <div className="lg:col-span-3 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36] mb-4 font-mono">{t('footer.services')}</span>
            <div className="flex flex-col gap-3 font-semibold text-neutral-600 text-xs text-left">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="hover:text-[#FF5A36] transition-colors cursor-pointer text-left flex items-center gap-1.5 group py-0.5"
              >
                <span className="text-[#FF5A36] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[11px]">➔</span>
                <span className="group-hover:translate-x-0.5 transition-transform">{t('service.s1')}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('activity-center')}
                className="hover:text-[#FF5A36] transition-colors cursor-pointer text-left flex items-center gap-1.5 group py-0.5"
              >
                <span className="text-[#FF5A36] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[11px]">➔</span>
                <span className="group-hover:translate-x-0.5 transition-transform">{t('service.s2')}</span>
              </button>
              {onBookSchoolDemo && (
                <button
                  type="button"
                  onClick={onBookSchoolDemo}
                  className="mt-1 text-[#FF5A36] hover:text-[#E04E2D] font-bold transition-colors cursor-pointer text-left flex items-center gap-1.5 group py-0.5"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform text-[11px]">➔</span>
                  <span>{language === 'mr' ? 'शाळेचा डेमो बुक करा' : 'Book School Demo'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Community & Resources Column */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">{t('footer.community')}</span>
            <div className="flex flex-col gap-2.5 font-semibold text-neutral-600 text-xs mb-6 text-left">
              <a
                href="https://www.linkedin.com/company/robostorms-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A66C2] transition-colors text-left flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/robostorms_tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] transition-colors text-left flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/robostorms/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877F2] transition-colors text-left flex items-center gap-1.5"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/@RobostormsTechnologyAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors text-left flex items-center gap-1.5"
              >
                <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>YouTube</span>
              </a>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 font-mono">{t('footer.resources')}</span>
            <div className="flex flex-col gap-3 font-semibold text-neutral-600 text-xs text-left">
              <span className="hover:text-[#FF5A36] transition-colors cursor-default text-left">{t('footer.privacy')}</span>
              <span className="hover:text-[#FF5A36] transition-colors cursor-default text-left">{t('footer.terms')}</span>
            </div>
          </div>

          {/* Quick Help Links & Contact Desk Column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36] mb-3 block font-mono">{t('footer.sales')}</span>
              <div className="flex flex-col gap-1.5 text-xs font-semibold">
                <a href="mailto:sales@robostorms.com" className="flex items-center gap-2 text-neutral-600 hover:text-[#FF5A36] transition-colors leading-none text-left">
                  <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                  sales@robostorms.com
                </a>
                <a href="tel:+917058202122" className="flex items-center gap-2 text-neutral-600 hover:text-[#FF5A36] transition-colors leading-none text-left mt-1">
                  <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                  +91 7058202122
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3 block font-mono">{t('footer.support')}</span>
              <div className="flex flex-col gap-1.5 text-xs font-semibold">
                <a href="mailto:admin@robostorms.com" className="flex items-center gap-2 text-neutral-600 hover:text-[#FF5A36] transition-colors leading-none text-left">
                  <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  admin@robostorms.com
                </a>
                <a href="tel:+917796969130" className="flex items-center gap-2 text-neutral-600 hover:text-[#FF5A36] transition-colors leading-none text-left mt-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  +91 7796969130
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36] mb-3 block font-mono">{t('footer.headOffice')}</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Near+Aditya+Corner%2C+Aurum+Lohia+Realty%2C+3rd+Floor%2C+Tarabai+Park%2C+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                title={language === 'mr' ? 'गुगल मॅप्सवर स्थान पहा' : 'View location on Google Maps'}
                className="group flex items-start gap-2 text-xs font-semibold text-neutral-600 hover:text-[#FF5A36] transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-[#FF5A36] group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5" />
                <span className="leading-normal text-left group-hover:underline underline-offset-4 decoration-[#FF5A36]/60">
                  {language === 'mr'
                    ? 'आदित्य कॉर्नर जवळ, औरम लोहिया रियल्टी, ३ रा मजला, ताराबाई पार्क, कोल्हापूर'
                    : 'Near Aditya Corner, Aurum Lohia Realty, 3rd Floor, Tarabai Park, Kolhapur'}
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Global Footer Bottom copyright */}
        <div className="border-t border-neutral-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 font-bold uppercase tracking-[0.12em]">
          <div className="text-center md:text-left">
            {t('footer.copyright')}
          </div>
          <div className="flex gap-4">
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">{t('footer.terms')}</span>
            <span>•</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">{t('footer.privacy')}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
