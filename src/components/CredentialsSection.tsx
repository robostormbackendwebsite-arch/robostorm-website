import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CredentialsSection() {
  const { language } = useLanguage();

  const credentials = [
    {
      id: 'cred-stem-accredited',
      image: '/1740854077_cert1.webp',
      alt: 'STEM.org / STEAM Accredited Educational Experience',
    },
    {
      id: 'cred-stem-reviewed',
      image: '/1740854081_cert2.webp',
      alt: 'STEM.org / STEAM Reviewed Educational Media',
    },
    {
      id: 'cred-startup-india',
      image: '/1740854085_download4.webp',
      alt: 'Startup India Recognised - DIPP82583',
    }
  ];

  return (
    <section id="credentials-section" className="w-full py-14 sm:py-18 border-t border-neutral-200 text-center relative overflow-hidden">
      {/* Background radial accent - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF5A36]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* SECTION HEADER */}
        <div className="mb-10 sm:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span id="credentials-badge" className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 rounded-full text-[10px] font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-4">
              <Award className="w-3.5 h-3.5" />
              {language === 'mr' ? 'विश्वासार्ह आणि मान्यताप्राप्त' : 'Trusted & Recognized'}
            </span>
            <h2 id="credentials-main-title" className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-extrabold text-[#1A1A1A] tracking-tight uppercase leading-tight text-center">
              {language === 'mr' ? (
                <>
                  आमची अधिकृत <span className="text-[#FF5A36]">प्रमाणपत्रे</span>
                </>
              ) : (
                <>
                  CHECK OUT OUR <span className="text-[#FF5A36]">CREDENTIALS</span>
                </>
              )}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 bg-[#FF5A36] mt-4 rounded-full"
            />
          </motion.div>
        </div>

        {/* CREDENTIALS LOGOS - Clean, unboxed, pure logos without text or boxes */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:gap-20 pt-2 pb-4">
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.id}
              id={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ scale: 1.06 }}
              className="flex items-center justify-center p-3 transition-transform duration-300 select-none cursor-default"
            >
              <img
                src={cred.image}
                alt={cred.alt}
                referrerPolicy="no-referrer"
                className="h-20 sm:h-24 md:h-28 w-auto max-w-[260px] sm:max-w-[300px] object-contain filter drop-shadow-sm"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
