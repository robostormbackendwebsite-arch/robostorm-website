import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export interface ServiceItem {
  id: string;
  num: string;
  titleEn: string;
  titleMr: string;
  icon: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'robotics-lab',
    num: '01',
    titleEn: 'Robotics Lab',
    titleMr: 'रोबोटिक्स लॅब',
    icon: '/icon_robotics_lab_retina.webp',
  },
  {
    id: 'stem-lab',
    num: '02',
    titleEn: 'STEAM Lab',
    titleMr: 'STEAM लॅब',
    icon: '/icon_stem_lab_retina.webp',
  },
  {
    id: 'ai-lab',
    num: '03',
    titleEn: 'AI Lab',
    titleMr: 'AI लॅब',
    icon: '/icon_ai_lab_retina.webp',
  },
  {
    id: 'coding-programming',
    num: '04',
    titleEn: 'Coding & Programming',
    titleMr: 'कोडिंग आणि प्रोग्रॅमिंग',
    icon: '/icon_coding_programming_retina.webp',
  },
  {
    id: 'iot-lab',
    num: '05',
    titleEn: 'IoT Lab',
    titleMr: 'IoT लॅब',
    icon: '/icon_iot_lab_retina.webp',
  },
  {
    id: 'drone-technology',
    num: '06',
    titleEn: 'Drone Technology',
    titleMr: 'ड्रोन टेक्नॉलॉजी',
    icon: '/icon_drone_technology_retina.webp',
  },
  {
    id: '3d-printing',
    num: '07',
    titleEn: '3D Printing',
    titleMr: '3D प्रिंटिंग',
    icon: '/icon_3d_printing_retina.webp',
  },
  {
    id: 'atl-lab',
    num: '08',
    titleEn: 'ATL Lab',
    titleMr: 'ATL लॅब',
    icon: '/icon_atl_lab_retina.webp',
  },
];

interface OurServicesRowProps {
  onServiceClick?: (serviceId: string) => void;
}

export default function OurServicesRow({ onServiceClick }: OurServicesRowProps) {
  const { language } = useLanguage();

  return (
    <section id="our-services" className="w-full border-t border-neutral-200 mt-12 sm:mt-16 pt-12 sm:pt-16 mb-3 sm:mb-4 text-left scroll-mt-24">
      {/* Header Badge & Title */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFEBE5] border border-[#FF5A36]/20 text-[#FF5A36] rounded-full text-xs font-ubuntu font-bold uppercase tracking-widest mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
          <span>{language === 'mr' ? 'आमच्या सेवा' : 'Our Services'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-ubuntu font-bold text-neutral-900 tracking-tight leading-tight">
          {language === 'mr' ? 'अत्याधुनिक लॅब आणि तंत्रज्ञान' : 'Cutting-Edge Labs & Programs'}
        </h2>
      </div>

      {/* 4 Cards in a Row Grid (2 Rows of 4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {servicesData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onServiceClick?.(item.id)}
            className="bg-white border-2 border-neutral-900 rounded-[1.3rem] p-5 sm:p-6 flex flex-col items-center justify-between text-center cursor-pointer transition-shadow duration-200 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] group min-h-[170px] sm:min-h-[190px] w-full"
          >
            {/* Top Icon Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 group-hover:bg-[#FFEBE5]/60 group-hover:border-[#FF5A36]/40 transition-colors mb-3">
              <img
                src={item.icon}
                alt={item.titleEn}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3"
                draggable={false}
              />
            </div>

            {/* Bottom Title Box (Fixed height for 100% perfect baseline alignment across all cards) */}
            <div className="h-12 flex items-center justify-center text-center w-full">
              <span className="font-ubuntu font-bold text-sm sm:text-base text-neutral-950 group-hover:text-[#FF5A36] transition-colors leading-snug">
                {language === 'mr' ? item.titleMr : item.titleEn}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
