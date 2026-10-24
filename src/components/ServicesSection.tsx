import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Wrench,
  ShieldCheck,
  FileText,
  GraduationCap,
  CalendarCheck2,
  RefreshCw,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

interface ServicesSectionProps {
  onConsultationClick?: () => void;
}

export default function ServicesSection({ onConsultationClick }: ServicesSectionProps) {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // The 4 real STEAM Lab photos from Robostorms schools
  const labPhotos = [
    {
      src: '/services/stem-lab-robotics-kit.jpg',
      alt: 'Students assembling robotics parts with Robostorms Advanced Robotics & AI Kit'
    },
    {
      src: '/services/stem-lab-ai-curriculum.jpg',
      alt: 'Robostorms STEAM Innovation Lab with AI, Robotics Architecture & Design Thinking Charts'
    },
    {
      src: '/services/stem-lab-smart-display.jpg',
      alt: 'Students assembling mechanical robotics kits with smart screen guidance'
    },
    {
      src: '/services/stem-lab-students-tablet.jpg',
      alt: 'Learners collaborating around interactive STEAM tablet and activity workbook'
    }
  ];

  // The 8 structured steps of school lab setup
  const steps = [
    {
      number: '01',
      icon: Wrench,
      titleEn: 'Installation',
      titleMr: 'लॅब स्थापना (Installation)',
      descEn:
        'First We Will Install The Lab. After Payment It takes 45 Days to Complete The Proper Full and Final Installation.',
      descMr:
        'प्रथम आम्ही लॅब स्थापित करू. पेमेंटनंतर संपूर्ण आणि अंतिम स्थापना पूर्ण करण्यासाठी ४५ दिवस लागतात.'
    },
    {
      number: '02',
      icon: ShieldCheck,
      titleEn: 'Safety Protocols',
      titleMr: 'सुरक्षा प्रोटोकॉल (Safety Protocols)',
      descEn:
        'Our Team Will Complete The Safety Protocols So that Your Team & Students Both Would Be Safe While Using The Lab.',
      descMr:
        'लॅब वापरताना तुमची टीम आणि विद्यार्थी दोघेही सुरक्षित राहतील याची खात्री करण्यासाठी आमची टीम सुरक्षा नियमावली पूर्ण करेल.'
    },
    {
      number: '03',
      icon: FileText,
      titleEn: 'Documentation and Analysis',
      titleMr: 'दस्तऐवजीकरण आणि विश्लेषण (Documentation and Analysis)',
      descEn:
        'We will Proceed further with the Documentation Which is Necessary To Maintain All Equipment.',
      descMr:
        'आम्ही सर्व उपकरणांची सुलभ देखभाल करण्यासाठी आवश्यक असलेल्या दस्तऐवजीकरणासह पुढे जाऊ.'
    },
    {
      number: '04',
      icon: GraduationCap,
      titleEn: 'Guidance and Instruction',
      titleMr: 'मार्गदर्शन आणि सूचना (Guidance and Instruction)',
      descEn:
        'Then Our Certified Trainer Will Train All Your Students & Trainer for Safety maintenance and introductory instruction as well.',
      descMr:
        'त्यानंतर आमचे प्रमाणित प्रशिक्षक तुमच्या सर्व विद्यार्थ्यांना आणि शिक्षकांना सुरक्षिततेची काळजी व परिचयात्मक सूचनांचे प्रशिक्षण देतील.'
    },
    {
      number: '05',
      icon: CalendarCheck2,
      titleEn: 'Regular Training',
      titleMr: 'नियमित प्रशिक्षण (Regular Training)',
      descEn:
        'Once We complete all Above mentioned Formalities we will proceed with the Regular Training. Training Time & Training Frequency varies with the Strength.',
      descMr:
        'सर्व औपचारिकता पूर्ण झाल्यानंतर आम्ही नियमित प्रशिक्षणास सुरुवात करू. विद्यार्थ्यांच्या संख्येनुसार प्रशिक्षणाचा वेळ आणि वारंवारता ठरवली जाते.'
    },
    {
      number: '06',
      icon: RefreshCw,
      titleEn: 'Maintenance and Upkeep',
      titleMr: 'देखभाल आणि निगा (Maintenance and Upkeep)',
      descEn:
        "Well It's Not Over Yet, our Team Will Do An Audit on Quarterly Basis to Ensure Availability & Longer Life of Equipment.",
      descMr:
        'आमचे काम इथेच संपत नाही, उपकरणांची उपलब्धता आणि दीर्घायुष्य सुनिश्चित करण्यासाठी आमची टीम दर ३ महिन्यांनी (त्रैमासिक) ऑडिट करेल.'
    },
    {
      number: '07',
      icon: TrendingUp,
      titleEn: 'Adaptation to Different Levels',
      titleMr: 'विविध स्तरांनुसार अद्यतनीकरण (Adaptation to Different Levels)',
      descEn:
        'We will Keep Adopting The New Upgradations on Yearly Basis. Also our Team will keep you Updated about the Different competitions and Certification programs.',
      descMr:
        'आम्ही वार्षिक स्तरावर नवीन अद्यतने स्वीकारत राहू. तसेच आमची टीम तुम्हाला विविध स्पर्धा आणि प्रमाणन कार्यक्रमांबद्दल अपडेट ठेवेल.'
    },
    {
      number: '08',
      icon: Award,
      titleEn: 'Certified Lab',
      titleMr: 'प्रमाणित लॅब (Certified Lab)',
      descEn:
        'Once You Successfully Complete Minimum 6 Audits and 3 Competitions your School will be Applicable for the STEAM Certification.',
      descMr:
        'किमान ६ ऑडिट आणि ३ स्पर्धा यशस्वीरीत्या पूर्ण केल्यानंतर तुमची शाळा STEAM प्रमाणपत्रासाठी पात्र ठरेल.',
      isMilestone: true
    }
  ];

  return (
    <section
      id="services"
      className="w-full pt-14 sm:pt-20 pb-6 sm:pb-8 border-t border-neutral-200 text-left relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* SECTION HEADER - Big editorial style matching Activity Center */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-xs font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {language === 'mr' ? 'शाळांसाठी प्रगत सेवा' : 'SCHOOL STEAM LAB SETUP & SERVICES'}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-neutral-900 leading-tight tracking-tight mb-4">
          {language === 'mr' ? (
            <>
              शाळांसाठी परिपूर्ण <span className="text-[#FF5A36]">STEAM लॅब स्थापना</span> व सेवा
            </>
          ) : (
            <>
              Turnkey School <span className="text-[#FF5A36]">STEAM Innovation Lab</span> Setup
            </>
          )}
        </h2>

        <p className="text-neutral-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
          {language === 'mr'
            ? 'आम्ही शाळांमध्ये आधुनिक विज्ञान, रोबोटिक्स, कोडिंग आणि एआय इनोव्हेशन लॅब्सची स्थापना करतो—हार्डवेअर इन्स्टॉलेशनपासून प्रमाणित प्रशिक्षण आणि राष्ट्रीय प्रमाणपत्रापर्यंत.'
            : 'We empower schools with turnkey STEAM Innovation Labs—from state-of-the-art hardware installation and safety protocols to dedicated certified trainers, quarterly audits, and official certification.'}
        </p>
      </div>

      {/* EDITORIAL FLOWING NARRATIVE - Big & Open, No Box Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20">
        {/* Left Column: Big Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-neutral-700 text-base sm:text-lg leading-relaxed">
          <p>
            {language === 'mr' ? (
              <>
                <strong>रोबोस्टॉर्म्स (Robostorms)</strong> शाळांमध्ये अत्याधुनिक <strong>STEAM (Science, Technology, Engineering, Arts and Mathematics)</strong> इनोव्हेशन लॅब्स स्थापन करण्यात अग्रेसर आहे. शाळांना केवळ उपकरणे देणे हा आमचा उद्देश नसून, विद्यार्थ्यांमध्ये प्रयोगशील वृत्ती, तार्किक विचार आणि नवकल्पनांचा विकास करणारी एक परिपूर्ण परिसंस्था आम्ही निर्माण करतो.
              </>
            ) : (
              <>
                At <strong>Robostorms</strong>, we specialize in building world-class <strong>STEAM (Science, Technology, Engineering, Arts & Mathematics) Innovation Labs</strong> directly inside school campuses. We transform conventional spaces into dynamic tech workspaces where students discover the power of practical robotics, IoT, circuitry, coding, and future technologies.
              </>
            )}
          </p>

          <p>
            {language === 'mr' ? (
              <>
                लॅबच्या प्रत्यक्ष इन्स्टॉलेशनपासून, सुरक्षा नियम, दैनंदिन उपकरणांची नोंद, ऑन-साइट प्रमाणित प्रशिक्षक नेमणे, आणि विद्यार्थ्यांसाठी नियमित हँड्स-ऑन वर्कशॉप्स आयोजित करणे या सर्व गोष्टींची जबाबदारी आमची तज्ज्ञ टीम घेते.
              </>
            ) : (
              <>
                Our end-to-end model relieves school administrations of operational hurdles. We oversee complete physical installation within 45 days, implement certified safety guidelines, deploy trained instructors, conduct structured grade-wise classes, and perform quarterly audits to guarantee the longevity of all equipment.
              </>
            )}
          </p>

          {/* Quick Key Guarantees */}
          <div className="pt-2">
            <h3 className="text-lg sm:text-xl font-ubuntu font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FF5A36]" />
              <span>{language === 'mr' ? 'आमची प्रमुख वैशिष्ट्ये' : 'What Sets Our School Labs Apart'}</span>
            </h3>

            <ul className="space-y-3 text-sm sm:text-base text-neutral-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5A36] mt-2 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? '४५ दिवसांत संपूर्ण इन्स्टॉलेशन:' : 'Guaranteed 45-Day Turnaround:'}</strong>{' '}
                  {language === 'mr'
                    ? 'कामाचा आदेश मिळाल्यानंतर ४५ दिवसांत पूर्ण लॅब सज्ज.'
                    : 'Prompt full-scale physical setup, workstations, and equipment deployment.'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5A36] mt-2 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? 'प्रमाणित ट्रेनर व शिक्षक प्रशिक्षण:' : 'Dedicated Certified Trainers:'}</strong>{' '}
                  {language === 'mr'
                    ? 'विद्यार्थी व शिक्षकांसाठी नियमित प्रात्यक्षिक वर्ग.'
                    : 'Full coaching for students and comprehensive training for school faculty.'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF5A36] mt-2 shrink-0" />
                <span>
                  <strong>{language === 'mr' ? 'त्रैमासिक ऑडिट व वार्षिक अपग्रेड्स:' : 'Quarterly Audits & Lifelong Upkeep:'}</strong>{' '}
                  {language === 'mr'
                    ? 'प्रत्येक ३ महिन्यांनी उपकरणांची तपासणी व नवीन तंत्रज्ञान जोडणी.'
                    : 'Scheduled maintenance visits, hardware servicing, and syllabus upgrades.'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Highlights & Direct CTA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-neutral-50/80 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 text-left">
            <span className="text-xs font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36] block mb-2 font-mono">
              {language === 'mr' ? 'शाळांसाठी भागीदारी' : 'For School Administrators'}
            </span>
            <h4 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 mb-3">
              {language === 'mr' ? 'तुमच्या शाळेत STEAM लॅब सुरू करा' : 'Bring a STEAM Lab to Your Campus'}
            </h4>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
              {language === 'mr'
                ? 'आमचे तज्ज्ञ तुमच्या शाळेची पाहणी करून संपूर्ण आराखडा, उपकरणांची यादी आणि अभ्यासक्रम योजना विनामूल्य सादर करतील.'
                : 'Join over 2,500+ government and private institutions powered by Robostorms. Get a customized lab blueprint and equipment plan.'}
            </p>

            <button
              onClick={onConsultationClick}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FF5A36] hover:bg-[#E04E2D] active:scale-98 text-white text-sm sm:text-base font-ubuntu font-bold rounded-2xl transition-all cursor-pointer shadow-sm group"
            >
              <span>
                {language === 'mr'
                  ? 'लॅब सेटअपसाठी मोफत सल्लामसलत'
                  : 'Schedule a Lab Setup Consultation'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>✓ Turnkey Execution</span>
              <span>✓ Certified Pedagogy</span>
              <span>✓ STEAM Accredited</span>
            </div>
          </div>
        </div>
      </div>

      {/* REAL PHOTOGRAPHY SHOWCASE - Clean, Beautiful, NO Captions / Info about images */}
      <div className="w-full mb-16 sm:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={isMobile ? false : { opacity: 0, y: 30 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={isMobile ? undefined : { y: -6 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 aspect-[4/3] border border-neutral-200/90 shadow-2xs hover:shadow-xl transition-all duration-500"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* STEP-BY-STEP LAB SETUP BLUEPRINT - Big, open typography without cramped box containers */}
      <div className="w-full">
        {/* Section Title */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-ubuntu font-bold uppercase tracking-wider text-neutral-700 mb-3 font-mono">
            <span>{language === 'mr' ? 'टप्प्याटप्प्याने अंमलबजावणी' : 'Our 8-Phase Roadmap'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-ubuntu font-bold text-neutral-900 tracking-tight">
            {language === 'mr'
              ? 'लॅब स्थापना आणि प्रमाणीकरणाची संपूर्ण प्रक्रिया'
              : 'How We Transform Your School: Step-by-Step Process'}
          </h3>
          <p className="text-neutral-500 text-sm sm:text-base mt-2">
            {language === 'mr'
              ? 'स्थापनेपासून ते आंतरराष्ट्रीय STEAM प्रमाणपत्रापर्यंतचा स्पष्ट व सुटसुटीत प्रवास.'
              : 'From first installation to international STEAM certification, here is exactly how our journey unfolds.'}
          </p>
        </div>

        {/* 8 Process Steps - Spacious, open editorial grid, NO cramped card box containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 sm:gap-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={isMobile ? false : { opacity: 0, y: 25 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-start gap-5 sm:gap-6 pb-8 border-b border-neutral-200/70 text-left ${
                  step.isMilestone ? 'bg-gradient-to-r from-[#FFEBE5]/40 via-transparent to-transparent -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl border-b-2 border-b-[#FF5A36]/40' : ''
                }`}
              >
                {/* Large Distinct Number Badge */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-ubuntu font-bold text-base sm:text-lg transition-all duration-300 select-none ${
                      step.isMilestone
                        ? 'bg-[#FF5A36] text-white shadow-lg shadow-[#FF5A36]/30'
                        : 'bg-neutral-900 text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-neutral-400 mt-2 tracking-widest">
                    {step.number}
                  </span>
                </div>

                {/* Step Content: Big titles, generous open description */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 leading-snug">
                      {language === 'mr' ? step.titleMr : step.titleEn}
                    </h4>
                    {step.isMilestone && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FF5A36] text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                        ★ Milestone
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                    {language === 'mr' ? step.descMr : step.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
