import { useState } from 'react';
import { Building2, School, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CollaborationSection() {
  const { language, t } = useLanguage();
  const [showAllGov, setShowAllGov] = useState(false);
  const [showAllSchools, setShowAllSchools] = useState(false);

  // Government Collaborations (Total 10) - Mumbai and Thane at the front
  const governmentLogos = [
    {
      id: 'mmc-mumbai',
      name: 'Mumbai Municipal Corporation',
      marathiName: 'बृहन्मुंबई महानगरपालिका',
      logo: '/collaborations/mmc-mumbai.png',
    },
    {
      id: 'tmc-thane',
      name: 'Thane Municipal Corporation',
      marathiName: 'ठाणे महानगरपालिका',
      logo: '/collaborations/tmc-thane.png',
    },
    {
      id: 'zp-palghar',
      name: 'Zilla Parishad Palghar',
      marathiName: 'पालघर जिल्हा परिषद',
      logo: '/collaborations/zp-palghar.png',
    },
    {
      id: 'zp-sangli',
      name: 'Zilla Parishad Sangli',
      marathiName: 'सांगली जिल्हा परिषद',
      logo: '/collaborations/zp-sangli.png',
    },
    {
      id: 'zp-sambhajinagar',
      name: 'Zilla Parishad Sambhaji Nagar',
      marathiName: 'संभाजीनगर जिल्हा परिषद',
      logo: '/collaborations/zp-sambhajinagar.png',
    },
    {
      id: 'zp-solapur',
      name: 'Zilla Parishad Solapur',
      marathiName: 'सोलापूर जिल्हा परिषद',
      logo: '/collaborations/zp-solapur.png',
    },
    {
      id: 'zp-beed',
      name: 'Zilla Parishad Beed',
      marathiName: 'बीड जिल्हा परिषद',
      logo: '/collaborations/zp-beed.png',
    },
    {
      id: 'zp-hingoli',
      name: 'Zilla Parishad Hingoli',
      marathiName: 'हिंगोली जिल्हा परिषद',
      logo: '/collaborations/zp-hingoli.png',
    },
    {
      id: 'zp-sindhudurg',
      name: 'Zilla Parishad Sindhudurg',
      marathiName: 'सिंधुदुर्ग जिल्हा परिषद',
      logo: '/collaborations/zp-sindhudurg.png',
    },
    {
      id: 'zp-ratnagiri',
      name: 'Zilla Parishad Ratnagiri',
      marathiName: 'रत्नागिरी जिल्हा परिषद',
      logo: '/collaborations/zp-ratnagiri.png',
    },
  ];

  // Associated Schools (Total 11) - DKTE College & Society and Rajat Education Society at the front
  const schoolLogos = [
    {
      id: 'school-dkte',
      name: 'DKTE Society & College',
      location: 'Ichalkaranji',
      marathiName: 'डीकेटीई सोसायटी व कॉलेज, इचलकरंजी',
      logo: '/collaborations/school-dkte.png',
    },
    {
      id: 'school-rajat',
      name: 'Rajat Education Society',
      location: 'Hupari',
      marathiName: 'रजत एज्युकेशन सोसायटी, हुपरी',
      logo: '/collaborations/school-rajat.png',
    },
    {
      id: 'school-ichalkaranji-highschool',
      name: 'Ichalkaranji High School & Jr. College (Rajwada)',
      location: 'Ichalkaranji',
      marathiName: 'इचलकरंजी हायस्कूल अँड ज्युनिअर कॉलेज (राजवाडा)',
      logo: '/collaborations/school-ichalkaranji-highschool.png',
    },
    {
      id: 'school-matsyodari',
      name: 'Matsyodari Shikshan Sanstha',
      location: 'Jalna',
      marathiName: 'मत्स्योदरी शिक्षण संस्था',
      logo: '/collaborations/school-matsyodari.png',
    },
    {
      id: 'school-symbolic',
      name: 'Symbolic International School (SIS)',
      location: 'Shiroli - Pulachi',
      marathiName: 'सिम्बॉलिक इंटरनॅशनल स्कूल (SIS), शिरोली पुलाची',
      logo: '/collaborations/school-symbolic.png',
    },
    {
      id: 'school-disha',
      name: 'Disha English Medium School',
      location: 'Peth Vadgaon',
      marathiName: 'दिशा इंग्लिश मीडियम स्कूल, पेठ वडगाव',
      logo: '/collaborations/school-disha.png',
    },
    {
      id: 'school-damct',
      name: 'Shri. D.A. Manere Charitable Trust (DAMCT)',
      location: 'Kolhapur',
      marathiName: 'श्री. डी. ए. मानेरे चॅरिटेबल ट्रस्ट (DAMCT)',
      logo: '/collaborations/school-damct.png',
    },
    {
      id: 'school-koa',
      name: 'Kishor Olympiad Academy (KOA)',
      location: 'Kolhapur',
      marathiName: 'किशोर ऑलिम्पियाड अकॅडमी (KOA)',
      logo: '/collaborations/school-koa.png',
    },
    {
      id: 'school-shah',
      name: 'M. G. Shah Vidyamandir & Jr. College',
      location: 'Bahubali',
      marathiName: 'एम. जी. शाह विद्यामंदिर अँड ज्युनिअर कॉलेज, बाहुबली',
      logo: '/1740901129_028623f893d1464a9d8b76d6e6bd7eb6.webp',
    },
    {
      id: 'school-sahyadri',
      name: 'Sahyadri Education Society',
      location: 'Ambap',
      marathiName: 'सह्याद्री एज्युकेशन सोसायटी, आंबप',
      logo: '/1740901126_75d44a30582d408f81888553559b52fa.webp',
    },
    {
      id: 'school-kipni',
      name: 'Kipni High School',
      location: 'Kipni, Kolhapur',
      marathiName: 'कीपणी हायस्कूल, कीपणी (कोल्हापूर)',
      logo: '/1740901122_9b50fe286f264f718d3dbc2f9140406f.webp',
    },
  ];

  // First row slices: 5 for government (on lg:grid-cols-5), 4 for schools (on lg:grid-cols-4)
  const visibleGovLogos = showAllGov ? governmentLogos : governmentLogos.slice(0, 5);
  const visibleSchoolLogos = showAllSchools ? schoolLogos : schoolLogos.slice(0, 4);

  return (
    <section
      id="collaboration"
      className="w-full pt-14 sm:pt-18 pb-16 border-t border-neutral-200 mt-12 sm:mt-16 text-left relative overflow-hidden"
    >
      {/* Ambient background glows - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#FF5A36]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* SUB-SECTION 1: GOVERNMENT COLLABORATIONS */}
      <div className="mb-16">
        <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-neutral-200/60">
          <div className="w-8 h-8 rounded-lg bg-[#FFEBE5] text-[#FF5A36] flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
            {t('collab.govTitle')}
          </h3>
        </div>

        {/* LOGOS GRID: First row by default, expands on View More */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {visibleGovLogos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center text-center group cursor-pointer transition-transform duration-300 hover:scale-105 select-none w-full max-w-[220px]"
            >
              <img
                src={item.logo}
                alt={language === 'mr' ? item.marathiName : item.name}
                className="h-28 sm:h-32 md:h-36 w-auto max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-102"
                loading="lazy"
                decoding="async"
              />
              <span className="mt-3 text-xs sm:text-sm font-ubuntu font-bold text-neutral-800 group-hover:text-[#FF5A36] transition-colors leading-snug">
                {language === 'mr' ? item.marathiName : item.name}
              </span>
            </div>
          ))}
        </div>

        {/* VIEW MORE / VIEW LESS BUTTON FOR GOVERNMENT COLLABORATIONS */}
        {governmentLogos.length > 5 && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={() => setShowAllGov(!showAllGov)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 hover:text-[#FF5A36] border border-neutral-300 hover:border-[#FF5A36]/40 font-ubuntu font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
            >
              <span>
                {showAllGov
                  ? (language === 'mr' ? 'कमी पहा' : 'View Less')
                  : (language === 'mr' ? `सर्व सरकारी सहकार्य पहा (${governmentLogos.length})` : `View More Government Partnerships (${governmentLogos.length})`)}
              </span>
              {showAllGov ? (
                <ChevronUp className="w-4 h-4 text-neutral-600 group-hover:text-[#FF5A36] transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neutral-600 group-hover:text-[#FF5A36] transition-colors" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* SUB-SECTION 2: ASSOCIATED SCHOOLS */}
      <div>
        <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-neutral-200/60">
          <div className="w-8 h-8 rounded-lg bg-[#FFEBE5] text-[#FF5A36] flex items-center justify-center shrink-0">
            <School className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-ubuntu font-bold text-neutral-900 tracking-tight">
              {t('collab.schoolTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              {t('collab.schoolSubtitle')}
            </p>
          </div>
        </div>

        {/* LOGOS GRID: First row (4 schools) by default, expands on View More */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {visibleSchoolLogos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center text-center group cursor-pointer transition-transform duration-300 hover:scale-105 select-none w-full max-w-[260px]"
            >
              <img
                src={item.logo}
                alt={language === 'mr' ? item.marathiName : item.name}
                className="h-24 sm:h-28 md:h-32 w-auto max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-102"
                loading="lazy"
                decoding="async"
              />
              <span className="mt-3 text-xs sm:text-sm font-ubuntu font-bold text-neutral-800 group-hover:text-[#FF5A36] transition-colors leading-snug">
                {language === 'mr' ? item.marathiName : item.name}
              </span>
              {item.location && (
                <span className="text-[11px] text-neutral-500 font-medium mt-0.5">
                  {item.location}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* VIEW MORE / VIEW LESS BUTTON FOR ASSOCIATED SCHOOLS */}
        {schoolLogos.length > 4 && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={() => setShowAllSchools(!showAllSchools)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 hover:text-[#FF5A36] border border-neutral-300 hover:border-[#FF5A36]/40 font-ubuntu font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
            >
              <span>
                {showAllSchools
                  ? (language === 'mr' ? 'कमी पहा' : 'View Less')
                  : (language === 'mr' ? `सर्व शाळा सहकार्य पहा (${schoolLogos.length})` : `View More School Partnerships (${schoolLogos.length})`)}
              </span>
              {showAllSchools ? (
                <ChevronUp className="w-4 h-4 text-neutral-600 group-hover:text-[#FF5A36] transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neutral-600 group-hover:text-[#FF5A36] transition-colors" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
