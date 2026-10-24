import { motion } from 'motion/react';
import { School, Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

interface Testimonial {
  id: string;
  image: string;
  alt: string;
  schoolName: string;
  location: string;
  text: string;
}

export default function SchoolTestimonialsSection() {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const testimonials: Testimonial[] =
    language === 'mr'
      ? [
          {
            id: 'school-kipni',
            image: '/1740901129_028623f893d1464a9d8b76d6e6bd7eb6.webp',
            alt: 'किणी हायस्कूल लोगो',
            schoolName: 'किणी हायस्कूल',
            location: 'किणी (कोल्हापूर)',
            text: 'रोबोस्टॉर्म्ससोबतचा आमचा अनुभव अत्यंत बदल घडवून आणणारा ठरला आहे. त्यांच्या रोबोटिक्स आणि कोडिंग लॅबने केवळ तांत्रिक कौशल्यांचाच विकास केला नाही, तर विद्यार्थ्यांमध्ये उत्सुकता, सर्जनशीलता आणि वैज्ञानिक प्रवृत्ती देखील रुजवली आहे.'
          },
          {
            id: 'school-sahyadri',
            image: '/1740901126_75d44a30582d408f81888553559b52fa.webp',
            alt: 'सह्याद्री एज्युकेशन सोसायटी लोगो',
            schoolName: 'सह्याद्री एज्युकेशन सोसायटी',
            location: 'आंबप, कोल्हापूर',
            text: "असाधारण सेवा आणि सातत्यपूर्ण मार्गदर्शनामुळे रोबोस्टॉर्म्स खरोखरच अग्रेसर आहे. ते केवळ साधने पुरवत नाहीत तर लॅब सुरळीतपणे चालण्यासाठी नियमितपणे तांत्रिक सहाय्य देखील देतात."
          },
          {
            id: 'school-shah',
            image: '/1740901122_9b50fe286f264f718d3dbc2f9140406f.webp',
            alt: 'एम. जी. शाह विद्यामंदिर लोगो',
            schoolName: 'एम. जी. शाह विद्यामंदिर व ज्युनिअर कॉलेज',
            location: 'बाहुबली, जि. कोल्हापूर',
            text: 'रोबोस्टॉर्म्सतर्फे मिळालेले मार्गदर्शक केवळ शिक्षक नाहीत, तर प्रेरणा देणारे मेंटर्स आहेत. त्यांचे रोबोटिक्स आणि कोडिंगबद्दलचे प्रेम पाहून विद्यार्थ्यांमध्ये तंत्रज्ञानाचे शिक्षण घेण्याची प्रखर इच्छा निर्माण झाली आहे.'
          }
        ]
      : [
          {
            id: 'school-kipni',
            image: '/1740901129_028623f893d1464a9d8b76d6e6bd7eb6.webp',
            alt: 'Kipni High School Logo',
            schoolName: 'Kipni High School',
            location: 'Kipni, Kolhapur',
            text: 'Our experience with Robostorms has been transformative. Their Robotics and Coding Lab has not only Equipped Students with Technical Skills but has also Sparked their curiosity, creativity, and a lifelong excitement for innovation and scientific inquiry.'
          },
          {
            id: 'school-sahyadri',
            image: '/1740901126_75d44a30582d408f81888553559b52fa.webp',
            alt: 'Sahyadri Education Society Logo',
            schoolName: 'Sahyadri Education Society',
            location: 'Ambap, Kolhapur',
            text: "What Truly sets RoboStorms Apart is their Exceptional Service and Support. They don't just provide Equipment; they Provide ongoing Assistance, Ensuring that our lab runs smoothly."
          },
          {
            id: 'school-shah',
            image: '/1740901122_9b50fe286f264f718d3dbc2f9140406f.webp',
            alt: 'M. G. Shah Vidyamandir Logo',
            schoolName: 'M. G. Shah Vidyamandir & Junior College',
            location: 'Bahubali, Kolhapur',
            text: 'The Trainers provided by RoboStorms are not just educators; they are Mentors and inspirations to our students. Their passion for robotics and coding is infectious, and it has inspired countless students to pursue engineering with confidence and vision.'
          }
        ];

  return (
    <section
      id="school-owners-testimonials"
      className="w-full py-16 sm:py-20 text-neutral-900 relative overflow-hidden text-center border-t border-neutral-200"
    >
      {/* Background radial accent - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF5A36]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* SECTION HEADER */}
        <div className="mb-12 sm:mb-16 text-center">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 15 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-xs font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
              <School className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शाळांकडून मिळालेले अभिप्राय' : 'Direct Impact Feedback'}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-extrabold text-[#1A1A1A] tracking-tight uppercase leading-tight max-w-4xl text-center">
              {language === 'mr' ? (
                <>
                  <span className="text-[#FF5A36]">अग्रगण्य शाळांचे</span> अनुभव <br className="hidden sm:inline" />
                  आमच्या <span className="text-[#FF5A36]">रोबोस्टॉर्म्स</span> लॅबबद्दल
                </>
              ) : (
                <>
                  WHAT <span className="text-[#FF5A36]">SCHOOL OWNERS</span> HAVE TO SAY <br className="hidden sm:inline" />
                  ABOUT <span className="text-[#FF5A36]">ROBOSTORMS</span>
                </>
              )}
            </h2>

            <div className="h-1.5 w-16 bg-[#FF5A36] mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* TESTIMONIALS 3-COLUMN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch pt-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              id={item.id}
              initial={isMobile ? false : { opacity: 0, y: 25 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white border-2 border-neutral-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1.5 transition-all duration-300 text-left relative overflow-hidden group"
            >
              {/* Subtle ambient accent inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5A36]/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* School Header: Clean Emblem + School Name & 5 Stars */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-50 border border-neutral-200/90 p-2 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain select-none"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h3 className="text-base sm:text-lg font-ubuntu font-bold text-neutral-900 leading-snug">
                      {item.schoolName}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5 truncate">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="relative pt-1">
                  <Quote className="w-8 h-8 text-[#FF5A36]/20 -mb-2" />
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                    "{item.text}"
                  </p>
                </div>
              </div>

              {/* Verified School Status */}
              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[11px]">
                  {language === 'mr' ? 'सत्यापित शाळा' : 'Partner School'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-emerald-700 font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'mr' ? 'सक्रिय STEAM लॅब' : 'Active STEAM Lab'}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
