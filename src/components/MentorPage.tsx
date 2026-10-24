import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe2,
  Users2,
  TrendingUp,
  Snowflake,
  Award,
  CheckCircle2,
  Quote,
  Sparkles,
  Building2,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MentorPageProps {
  onBackToHome: () => void;
}

export default function MentorPage({ onBackToHome }: MentorPageProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'team' | 'mentor'>('team');

  // Team members data extracted from 'Website People behind.xlsx'
  const teamMembers = [
    {
      name: 'Aashish Desai',
      positionEn: 'Director',
      positionMr: 'संचालक (Director)',
      quoteEn:
        'Leading with vision and strategic direction to drive innovation, business growth, and the future of Robostorms Technology.',
      quoteMr:
        'नाविन्यता, व्यवसाय वाढ आणि रोबोस्टॉर्म्स टेक्नॉलॉजीचे उज्ज्वल भविष्य घडवण्यासाठी दूरदृष्टी आणि धोरणात्मक नेतृत्वाने मार्गक्रमण.',
      image: '/team/aashish-desai.jpg'
    },
    {
      name: 'Sudhir Patil',
      positionEn: 'Director',
      positionMr: 'संचालक (Director)',
      quoteEn:
        'Driving organizational excellence through strategic leadership, collaboration, and a commitment to technological advancement.',
      quoteMr:
        'धोरणात्मक नेतृत्व, सहकार्य आणि तंत्रज्ञान प्रगतीच्या वचनबद्धतेद्वारे संस्थात्मक उत्कृष्टता साध्य करणे.',
      image: '/team/sudhir-patil.jpg'
    },
    {
      name: 'Vijay Bargale',
      positionEn: 'Manager',
      positionMr: 'व्यवस्थापक (Manager)',
      quoteEn:
        'Ensuring smooth operations, effective coordination, and team performance to achieve organizational goals.',
      quoteMr:
        'संस्थेची उद्दिष्टे साध्य करण्यासाठी सुरळीत कामकाज, प्रभावी समन्वय आणि कार्यक्षम टीम कामगिरी सुनिश्चित करणे.',
      image: '/team/vijay-bargale.jpg'
    },
    {
      name: 'Vikas Bhandari',
      positionEn: 'Training and Innovation Head',
      positionMr: 'प्रशिक्षण व इनोव्हेशन प्रमुख',
      quoteEn:
        'Turning innovative ideas into reality through technology, creativity, and problem-solving.',
      quoteMr:
        'तंत्रज्ञान, सर्जनशीलता आणि समस्या निवारणाच्या माध्यमातून नाविन्यपूर्ण कल्पनांचे प्रत्यक्षात रूपांतर करणे.',
      image: '/team/vikas-bhandari.jpg'
    },
    {
      name: 'Prabhakar Bansode',
      positionEn: 'Research and Development Head',
      positionMr: 'संशोधन व विकास प्रमुख (R&D Head)',
      quoteEn:
        'Driving research and development to transform creative ideas into innovative technological solutions.',
      quoteMr:
        'सर्जनशील कल्पनांना नाविन्यपूर्ण तांत्रिक उपायांमध्ये रूपांतरित करण्यासाठी निरंतर संशोधन व विकासाचे नेतृत्व.',
      image: '/team/prabhakar-bansode.jpg'
    },
    {
      name: 'Reena Angadi',
      positionEn: 'Business Development Head',
      positionMr: 'व्यवसाय विकास प्रमुख (Business Development Head)',
      quoteEn:
        'At Robostorms, we don’t just set up labs; we build lasting partnerships with schools so every child gets the confidence to create, innovate and lead.',
      quoteMr:
        'रोबोस्टॉर्म्समध्ये आम्ही फक्त लॅब्स उभारणी करत नाही; तर शाळांसोबत दीर्घकालीन भागीदारी निर्माण करतो, जेणेकरून प्रत्येक मुलाला निर्मिती, नवसंशोधन आणि नेतृत्वाचा आत्मविश्वास लाभेल.',
      image: '/team/reena-angadi.jpg'
    },
    {
      name: 'Sammed Desai',
      positionEn: 'Tender Department Head',
      positionMr: 'निविदा विभाग प्रमुख (Tender Department Head)',
      quoteEn:
        'Managing tender processes, documentation, and submissions with accuracy, efficiency, and attention to detail.',
      quoteMr:
        'अचूकता, कार्यक्षमता आणि सूक्ष्म नियोजनासह सर्व निविदा प्रक्रिया, दस्तऐवजीकरण आणि सादरीकरणाचे व्यवस्थापन.',
      image: '/team/sammed-desai.jpg'
    },
    {
      name: 'Sagar Kurle',
      positionEn: 'Finance Head',
      positionMr: 'वित्त प्रमुख (Finance Head)',
      quoteEn:
        'Leading financial planning and management with integrity, precision, and a focus on sustainable business growth.',
      quoteMr:
        'पारदर्शकता, अचूकता आणि शाश्वत व्यवसाय वाढीवर भर देऊन आर्थिक नियोजन व व्यवस्थापनाचे नेतृत्व.',
      image: '/team/sagar-kurle.jpg'
    },
    {
      name: 'Yogesh Mardane',
      positionEn: 'Logistic Head',
      positionMr: 'लॉजिस्टिक प्रमुख (Logistic Head)',
      quoteEn:
        'Ensuring efficient logistics, resource coordination, and timely delivery to support smooth business operations.',
      quoteMr:
        'व्यवसायाच्या सुरळीत संचालनास पाठबळ देण्यासाठी कार्यक्षम लॉजिस्टिक्स, संसाधनांचा समन्वय आणि वेळेवर वितरण सुनिश्चित करणे.',
      image: '/team/yogesh-mardane.jpg'
    },
    {
      name: 'Suash Pawar',
      positionEn: 'Office Support Staff',
      positionMr: 'कार्यालयीन सहाय्यक (Office Support Staff)',
      quoteEn:
        'Supporting daily office operations and maintaining an organized, efficient, and welcoming workplace.',
      quoteMr:
        'दैनंदिन कार्यालयीन कामकाजास पाठबळ देणे आणि एक सुव्यवस्थित, कार्यक्षम व स्वागतार्ह कार्यस्थळ राखणे.',
      image: '/team/suash-pawar.jpg'
    }
  ];

  // Mentor Ravindra Dolare metrics and highlights
  const impactMetrics = [
    {
      icon: Globe2,
      value: '15+',
      labelEn: 'Countries',
      labelMr: 'देश',
      subEn: 'Operating across Asia, Africa & Southeast Asia',
      subMr: 'आशिया, आफ्रिका आणि दक्षिण-पूर्व आशियामध्ये कार्यरत',
      accent: 'border-blue-200 bg-blue-50/50 text-blue-600'
    },
    {
      icon: Users2,
      value: '2,50,000+',
      labelEn: 'Farmers Impacted',
      labelMr: 'शेतकऱ्यांना लाभ',
      subEn: 'Empowering farmers through sustainable solutions',
      subMr: 'शाश्वत तंत्रज्ञानाद्वारे शेतकऱ्यांचे सक्षमीकरण',
      accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-600'
    },
    {
      icon: Snowflake,
      value: '55,000+',
      labelEn: 'Farmers Supported',
      labelMr: 'शेतकऱ्यांना आधार',
      subEn: "Through Ecofrost – India's leading solar cold storage solution",
      subMr: 'इकोफ्रॉस्ट - भारतातील आघाडीच्या सोलर कोल्ड स्टोरेजद्वारे',
      accent: 'border-cyan-200 bg-cyan-50/50 text-cyan-600'
    },
    {
      icon: TrendingUp,
      value: '7X',
      labelEn: 'Business Growth',
      labelMr: 'व्यवसाय वाढ',
      subEn: 'Scaled Ecozen 7x in 5 years, crossing ₹1,000 Cr in FY 26 profitably',
      subMr: '५ वर्षांत ७ पट वाढ आणि आर्थिक वर्ष २६ मध्ये ₹१,००० कोटींचा टप्पा पार',
      accent: 'border-orange-200 bg-orange-50/50 text-[#FF5A36]'
    }
  ];

  const highlights = [
    {
      en: 'President at Ecozen Solutions – Leading climate-tech innovations like Ecofrost (solar cold storage), Ecotron (IoT irrigation) & motor controls.',
      mr: 'इकोझेन सोल्युशन्सचे अध्यक्ष – इकोफ्रॉस्ट (सोलर कोल्ड स्टोरेज), इकोट्रॉन (IoT सिंचन) आणि मोटर कंट्रोल्ससारख्या क्लायमेट-टेक नवोपक्रमांचे नेतृत्व.'
    },
    {
      en: 'Scaled Ecozen 7x in just 5 years, crossing ₹1,000 crore revenue mark profitably in FY 26.',
      mr: 'अवघ्या ५ वर्षांत इकोझेनचा व्यवसाय ७ पटीने वाढवून आर्थिक वर्ष २६ मध्ये नफ्यासह ₹१,००० कोटींचा टप्पा यशस्वीरीत्या पार केला.'
    },
    {
      en: 'Secured Series C funding of $25 Million to accelerate innovation and global expansion.',
      mr: 'जागतिक विस्तार आणि नवोपक्रमांना गती देण्यासाठी २५ दशलक्ष डॉलर्सचा (Series C) निधी उभारला.'
    },
    {
      en: 'Strategic partnerships with MNRE, EESL, NCCD, MEDA, UPNEDA, Ministry of Power & other key government bodies.',
      mr: 'नवीन व नवीकरणीय ऊर्जा मंत्रालय (MNRE), EESL, NCCD, MEDA, UPNEDA, ऊर्जा मंत्रालय आणि इतर प्रमुख सरकारी संस्थांशी धोरणात्मक भागीदारी.'
    },
    {
      en: 'Impacted 2,50,000+ farmers across India, Africa & Southeast Asia by reducing post-harvest losses and improving income stability.',
      mr: 'कापणीनंतरचे नुकसान कमी करून आणि उत्पन्नात स्थैर्य आणून भारत, आफ्रिका आणि दक्षिण-पूर्व आशियातील २,५०,०००+ शेतकऱ्यांचे जीवन बदलले.'
    },
    {
      en: 'Strong background in Engineering & Strategic Management with 15+ years of global experience.',
      mr: 'इंजिनिअरिंग आणि स्ट्रॅटेजिक मॅनेजमेंटची मजबूत पार्श्वभूमी आणि १५+ वर्षांचा आंतरराष्ट्रीय अनुभव.'
    }
  ];

  const globalPlatforms = [
    {
      en: "World Bank's India Climate & Development Meet",
      mr: 'जागतिक बँकेची इंडिया क्लायमेट आणि डेव्हलपमेंट परिषद'
    },
    {
      en: 'GOGLA Global Off-Grid Solar Forums – Delhi & Nairobi',
      mr: 'GOGLA ग्लोबल ऑफ-ग्रिड सोलर फोरम – दिल्ली आणि नैरोबी'
    },
    {
      en: 'Clean Energy Ministerial (CEM14/MI-8)',
      mr: 'क्लीन एनर्जी मिनिस्ट्रिअल परिषद (CEM14/MI-8)'
    },
    {
      en: 'TechEmerge Cooling Innovation Summit',
      mr: 'TechEmerge कुलिंग इनोव्हेशन समिट'
    },
    {
      en: 'SAFDE and WRI DRE Dialogues',
      mr: 'SAFDE आणि WRI DRE आंतरराष्ट्रीय संवाद'
    }
  ];

  return (
    <main className="flex-grow min-h-screen w-full bg-[#FAF9F5] text-[#1A1A1A] pb-24 text-left">
      {/* TOP HEADER WITH BACK BUTTON & TAB SELECTOR */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
          <div className="mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-[#FF5A36] border border-neutral-200 text-xs font-ubuntu font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFEBE5] text-[#FF5A36] border border-[#FF5A36]/20 rounded-full text-xs font-ubuntu font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeTab === 'team'
                    ? language === 'mr'
                      ? 'इनोव्हेशनमागील आमची टीम'
                      : 'THE PEOPLE BEHIND INNOVATION'
                    : language === 'mr'
                    ? 'आमचे सल्लागार व मार्गदर्शक'
                    : 'OUR MENTOR & ADVISOR'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-ubuntu font-extrabold text-neutral-900 tracking-tight">
                {activeTab === 'team' ? (
                  language === 'mr' ? (
                    <>
                      रोबोस्टॉर्म्स <span className="text-[#FF5A36]">टीम</span>
                    </>
                  ) : (
                    <>
                      Meet Our <span className="text-[#FF5A36]">Team</span>
                    </>
                  )
                ) : language === 'mr' ? (
                  'रवींद्र डोलारे'
                ) : (
                  'Ravindra Dolare'
                )}
              </h1>
              <p className="text-neutral-500 text-sm sm:text-base mt-1.5 font-medium max-w-2xl">
                {activeTab === 'team'
                  ? language === 'mr'
                    ? 'रोबोस्टॉर्म्स टेक्नॉलॉजीचे संचालक, विभागप्रमुख आणि व्यवस्थापन संघ जे विद्यार्थ्यांचे भविष्य घडवण्यासाठी अखंड कार्यरत आहेत.'
                    : 'The dedicated directors, department heads, and managers leading Robostorms Technology forward.'
                  : language === 'mr'
                  ? 'सल्लागार, रोबोस्टॉर्म्स टेक्नॉलॉजी प्रा. लि. • अध्यक्ष, इकोझेन सोल्युशन्स'
                  : 'Advisor, Robostorms Technology Pvt. Ltd. • President, Ecozen Solutions'}
              </p>
            </div>

            {/* TWO-TAB SWITCHER: [ Our Team ] and [ Mentor & Advisor ] */}
            <div className="flex items-center p-1 bg-neutral-100 rounded-2xl border border-neutral-200 shrink-0 self-start md:self-end">
              <button
                onClick={() => setActiveTab('team')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-ubuntu font-bold transition-all cursor-pointer ${
                  activeTab === 'team'
                    ? 'bg-[#FF5A36] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Users2 className="w-4 h-4" />
                <span>{language === 'mr' ? 'आमची टीम' : 'Our Team'}</span>
              </button>
              <button
                onClick={() => setActiveTab('mentor')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-ubuntu font-bold transition-all cursor-pointer ${
                  activeTab === 'mentor'
                    ? 'bg-[#FF5A36] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{language === 'mr' ? 'मार्गदर्शक' : 'Mentor & Advisor'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: OUR TEAM - CLEAN, EDITORIAL, UNBOXED (NO CONTAINER/BOXES)      */}
      {/* ==================================================================== */}
      {activeTab === 'team' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-12 sm:gap-y-16 items-start">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col text-left transition-all duration-300"
              >
                {/* Photo Frame - Free-standing, unboxed with smooth hover zoom */}
                <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-2xs group-hover:shadow-xl transition-all duration-500 border border-neutral-200/60">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                </div>

                {/* Typography Directly Under Photo (No card box enclosing it) */}
                <div className="pt-4 flex flex-col">
                  {/* Position Tag */}
                  <span className="text-[11px] sm:text-xs font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
                    {language === 'mr' ? member.positionMr : member.positionEn}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 group-hover:text-[#FF5A36] transition-colors leading-snug">
                    {member.name}
                  </h3>

                  {/* Personal Line / Information from Excel */}
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal mt-2.5">
                    {language === 'mr' ? member.quoteMr : member.quoteEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: MENTOR & ADVISOR (RAVINDRA DOLARE)                             */}
      {/* ==================================================================== */}
      {activeTab === 'mentor' && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN: COMPREHENSIVE INFORMATION */}
            <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
              {/* WELCOME / ANNOUNCEMENT CALLOUT */}
              <div className="bg-white border-2 border-[#FF5A36]/30 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-left">
                <div className="absolute top-4 right-4 text-[#FF5A36]/15 pointer-events-none">
                  <Quote className="w-20 h-20 -rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFEBE5] flex items-center justify-center text-[#FF5A36]">
                      <Quote className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36]">
                      {language === 'mr' ? 'अधिकृत स्वागत संदेश' : 'Official Welcome Announcement'}
                    </span>
                  </div>

                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-medium mb-5">
                    {language === 'mr' ? (
                      <>
                        रोबोस्टॉर्म्स टेक्नॉलॉजी प्रा. लि. चे सल्लागार म्हणून <strong className="text-neutral-900 font-bold">श्री. रवींद्र डोलारे</strong> यांचे स्वागत करताना आम्हाला अत्यंत आनंद होत आहे. त्यांच्या बहुमूल्य अनुभवाने, दूरदृष्टीने आणि खंबीर नेतृत्वाने रोबोस्टॉर्म्स नाविन्यपूर्ण तंत्रज्ञान, वेगवान वाढ आणि यशाची नवी शिखरे गाठेल याचा आम्हाला पूर्ण विश्वास आहे.
                      </>
                    ) : (
                      <>
                        We are delighted to welcome <strong className="text-neutral-900 font-bold">Mr. Ravindra Dolare</strong> as an Advisor at <strong className="text-neutral-900 font-bold">Robostorms Technology Pvt. Ltd.</strong> With his valuable experience, leadership, and vision, we are confident that his guidance will drive us towards greater innovation, growth, and success.
                      </>
                    )}
                  </p>

                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-xs font-ubuntu font-extrabold text-[#FF5A36] uppercase tracking-wider">
                      WELCOME ABOARD, RAVINDRA SIR!
                    </span>
                    <span className="text-xs font-ubuntu font-bold text-neutral-800 uppercase tracking-wider">
                      TOGETHER, LET’S BUILD THE FUTURE!
                    </span>
                  </div>
                </div>
              </div>

              {/* IMPACT METRICS */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-[#FF5A36]" />
                  <h2 className="text-sm font-ubuntu font-bold uppercase tracking-widest text-neutral-500 font-mono">
                    {language === 'mr' ? 'प्रभाव आणि यशाचा प्रवास' : 'A JOURNEY OF IMPACT & EXCELLENCE'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {impactMetrics.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all text-left flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl sm:text-3xl font-ubuntu font-extrabold text-neutral-900 tracking-tight">
                            {metric.value}
                          </span>
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${metric.accent}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-ubuntu font-bold text-neutral-800 uppercase tracking-wider mb-1">
                            {language === 'mr' ? metric.labelMr : metric.labelEn}
                          </h4>
                          <p className="text-xs text-neutral-500 leading-relaxed">
                            {language === 'mr' ? metric.subMr : metric.subEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* HIGHLIGHTS */}
              <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-5">
                  <Layers className="w-4 h-4 text-[#FF5A36]" />
                  <h3 className="text-base sm:text-lg font-ubuntu font-bold text-neutral-900 tracking-tight">
                    {language === 'mr' ? 'कारकिर्दीतील ठळक वैशिष्ट्ये' : 'Key Highlights From His Journey'}
                  </h3>
                </div>

                <div className="space-y-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5A36] mt-1 shrink-0" />
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                        {language === 'mr' ? h.mr : h.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GLOBAL PLATFORMS */}
              <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-[#FF5A36]" />
                      <h3 className="text-base sm:text-lg font-ubuntu font-bold text-white tracking-tight">
                        {language === 'mr' ? 'प्रतिनिधित्व केलेले जागतिक मंच' : 'Global Platforms Represented'}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-md">
                      International Summits
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {globalPlatforms.map((platform, i) => (
                      <div
                        key={i}
                        className="p-3 bg-neutral-800/80 border border-neutral-700/80 rounded-xl flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] mt-2 shrink-0" />
                        <span className="text-xs text-neutral-200 font-medium leading-relaxed">
                          {language === 'mr' ? platform.mr : platform.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OFFICIAL PHOTO OF MR. RAVINDRA DOLARE (CLEAN LIKE TEAM MEMBERS) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-8 order-1 lg:order-2 w-full">
              <div className="w-full max-w-[420px] flex flex-col text-left">
                {/* Photo Frame - Clean, free-standing, unboxed like team member */}
                <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-2xs hover:shadow-xl transition-all duration-500 border border-neutral-200/60">
                  <img
                    src="/ravindra-dolare.jpg"
                    alt="Mr. Ravindra Dolare - Advisor at Robostorms Technology"
                    className="w-full h-full object-cover object-top hover:scale-104 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                </div>

                {/* Persona Typography Directly Under Photo */}
                <div className="pt-4 flex flex-col">
                  {/* Position Tag */}
                  <span className="text-[11px] sm:text-xs font-ubuntu font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
                    {language === 'mr' ? 'सल्लागार (Strategic Advisor)' : 'Strategic Advisor'}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl sm:text-3xl font-ubuntu font-bold text-neutral-900 tracking-tight leading-snug">
                    {language === 'mr' ? 'श्री. रवींद्र डोलारे' : 'Mr. Ravindra Dolare'}
                  </h3>

                  {/* Role Description */}
                  <p className="text-sm text-neutral-600 font-medium leading-relaxed mt-1.5">
                    {language === 'mr'
                      ? 'अध्यक्ष - इकोझेन सोल्युशन्स | सल्लागार - रोबोस्टॉर्म्स टेक्नॉलॉजी प्रा. लि.'
                      : 'President, Ecozen Solutions | Strategic Advisor, Robostorms Technology'}
                  </p>

                  {/* Quick Profile Tags */}
                  <div className="mt-4 pt-4 border-t border-neutral-200/70 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-700">
                      Climate Tech
                    </span>
                    <span className="px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-700">
                      Global Scaling
                    </span>
                    <span className="px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-700">
                      IoT & Engineering
                    </span>
                    <span className="px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-700">
                      Strategic Growth
                    </span>
                  </div>
                </div>
              </div>

              {/* Mission Statement under photo - Clean and unboxed */}
              <div className="w-full max-w-[420px] mt-6 pt-5 border-t border-neutral-200/80 text-left">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#FF5A36] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-ubuntu font-bold text-neutral-900 uppercase tracking-wider">
                      {language === 'mr' ? 'रोबोस्टॉर्म्सचे व्हिजन' : 'Robostorms Mission & Vision'}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-1 font-medium">
                      {language === 'mr'
                        ? 'रवींद्र सरांच्या मार्गदर्शनाखाली, रोबोस्टॉर्म्स महाराष्ट्रातील शाळांमध्ये प्रगत रोबोटिक्स, AI आणि STEAM लॅब्सचे जाळे मोठ्या प्रमाणावर विस्तारत आहे.'
                        : "Under Mr. Dolare's mentorship, Robostorms is scaling world-class STEAM robotics, coding, and innovation hubs across schools nationwide."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
