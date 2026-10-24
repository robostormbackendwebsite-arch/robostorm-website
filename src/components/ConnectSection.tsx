import React from 'react';
import { motion } from 'motion/react';
import {
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SocialChannel {
  id: 'linkedin' | 'instagram' | 'youtube' | 'facebook';
  name: string;
  badge: string;
  handle: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgLight: string;
  hoverBorder: string;
  hoverShadow: string;
  stat: string;
  statLabel: { en: string; mr: string };
  description: { en: string; mr: string };
  actionLabel: { en: string; mr: string };
}

export default function ConnectSection() {
  const { language } = useLanguage();

  const channels: SocialChannel[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      badge: 'Corporate Hub',
      handle: 'Robostorms Technology',
      url: 'https://www.linkedin.com/company/robostorms-technology/',
      icon: Linkedin,
      accentColor: '#0A66C2',
      bgLight: 'bg-[#0A66C2]/10 text-[#0A66C2]',
      hoverBorder: 'hover:border-[#0A66C2]/40',
      hoverShadow: 'hover:shadow-[#0A66C2]/10',
      stat: '2,180+',
      statLabel: {
        en: 'Educators & Partners',
        mr: 'शिक्षक व संस्था सदस्य'
      },
      description: {
        en: 'Official corporate network for school lab launches, faculty recruitment, and institutional partnerships.',
        mr: 'शालेय लॅब स्थापना, प्राध्यापक भरती आणि शैक्षणिक सहकार्यासाठी अधिकृत नेटवर्क.'
      },
      actionLabel: {
        en: 'Follow on LinkedIn',
        mr: 'लिंक्डइनवर जोडा'
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      badge: 'Daily Stories',
      handle: '@robostorms_tech',
      url: 'https://www.instagram.com/robostorms_tech/',
      icon: Instagram,
      accentColor: '#E1306C',
      bgLight: 'bg-[#E1306C]/10 text-[#E1306C]',
      hoverBorder: 'hover:border-[#E1306C]/40',
      hoverShadow: 'hover:shadow-[#E1306C]/10',
      stat: '5,420+',
      statLabel: {
        en: 'Students & Mentors',
        mr: 'विद्यार्थी आणि मार्गदर्शक'
      },
      description: {
        en: 'Daily highlights of student robot builds, STEAM experiments, and live behind-the-scenes action.',
        mr: 'विद्यार्थ्यांचे रोबोट मॉडेल्स, सायन्स टिप्स आणि लॅब प्रयोगांच्या दररोज ताज्या घडामोडी.'
      },
      actionLabel: {
        en: 'Follow on Instagram',
        mr: 'इन्स्टाग्रामवर फॉलो करा'
      }
    },
    {
      id: 'youtube',
      name: 'YouTube',
      badge: 'Video Academy',
      handle: '@RobostormsAcademy',
      url: 'https://www.youtube.com/@RobostormsTechnologyAcademy',
      icon: Youtube,
      accentColor: '#FF0000',
      bgLight: 'bg-[#FF0000]/10 text-[#FF0000]',
      hoverBorder: 'hover:border-[#FF0000]/40',
      hoverShadow: 'hover:shadow-[#FF0000]/10',
      stat: 'Lectures & Demos',
      statLabel: {
        en: 'Curriculum & Hardware',
        mr: 'व्हिडिओ धडे व प्रॅक्टिकल्स'
      },
      description: {
        en: 'Comprehensive robotics tutorials, STEAM project guides, and hands-on kit disassembly sessions.',
        mr: 'सखोल रोबोटिक्स लेक्चर्स, प्रॅक्टिकल व्हिडिओ धडे आणि तंत्रज्ञान कार्यशाळा.'
      },
      actionLabel: {
        en: 'Watch on YouTube',
        mr: 'यूट्यूब सबस्क्राईब करा'
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      badge: 'Community',
      handle: 'Robostorms',
      url: 'https://www.facebook.com/robostorms/',
      icon: Facebook,
      accentColor: '#1877F2',
      bgLight: 'bg-[#1877F2]/10 text-[#1877F2]',
      hoverBorder: 'hover:border-[#1877F2]/40',
      hoverShadow: 'hover:shadow-[#1877F2]/10',
      stat: '1,248+',
      statLabel: {
        en: 'Community Peers',
        mr: 'समुदाय सदस्य'
      },
      description: {
        en: 'Connect with local parent communities, regional science fairs, and school event galleries.',
        mr: 'स्थानिक पालक समुदाय, विज्ञान मेळावे आणि शालेय उपक्रमांच्या फोटोंसाठी जोडा.'
      },
      actionLabel: {
        en: 'Join on Facebook',
        mr: 'फेसबुकवर सामील व्हा'
      }
    }
  ];

  return (
    <section
      id="connect-with-robostorms"
      className="w-full py-16 sm:py-20 bg-gradient-to-b from-white via-neutral-50/60 to-white text-[#1A1A1A] relative overflow-hidden text-center border-t border-neutral-200/80"
    >
      {/* Background visual brand accent ambient lights - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF5A36]/5 rounded-full blur-[110px] -z-10 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-blue-500/5 rounded-full blur-[110px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-12 sm:mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF5A36]/10 border border-[#FF5A36]/20 rounded-full text-[11px] font-ubuntu font-bold uppercase tracking-widest text-[#FF5A36] mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
              <span>{language === 'mr' ? 'सोशल हब आणि समुदाय' : 'Community & Platforms'}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-extrabold text-[#1A1A1A] tracking-tight uppercase leading-tight max-w-4xl text-center">
              {language === 'mr' ? (
                <>
                  <span className="text-[#FF5A36]">रोबोस्टॉर्म्स</span> नेटवर्कशी जोडा
                </>
              ) : (
                <>
                  CONNECT WITH <span className="text-[#FF5A36]">ROBOSTORMS</span>
                </>
              )}
            </h2>

            <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-2.5 max-w-xl text-center leading-relaxed">
              {language === 'mr'
                ? 'हजारो तरुण नवसंशोधक, पालक आणि मार्गदर्शकांच्या सक्रिय नेटवर्कमध्ये सामील व्हा आणि STEAM विश्वाशी जोडलेले राहा.'
                : 'Join thousands of young innovators, parents, and educators across our verified digital network.'}
            </p>

            <div className="h-1 w-14 bg-gradient-to-r from-[#FF5A36] to-amber-500 rounded-full mt-4" />
          </motion.div>
        </div>

        {/* CLUTTER-FREE BALANCED SOCIAL CHANNELS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {channels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative flex flex-col justify-between bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-xl ${channel.hoverBorder} ${channel.hoverShadow} text-left`}
              >
                {/* Top Subtle Brand Tint Line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2.5px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: channel.accentColor }}
                />

                {/* Top Header Row: Icon + Badge + Arrow */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-108 ${channel.bgLight}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-ubuntu font-bold text-base text-neutral-900 group-hover:text-black leading-tight">
                          {channel.name}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400 font-medium">
                          {channel.handle}
                        </p>
                      </div>
                    </div>

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open Robostorms on ${channel.name}`}
                      className="w-8 h-8 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Concise Value Description */}
                  <p className="text-neutral-600 text-xs leading-relaxed mb-6 font-normal">
                    {channel.description[language]}
                  </p>
                </div>

                {/* Bottom Row: Stat Pill + Direct CTA */}
                <div className="pt-4 border-t border-neutral-100/90 flex flex-col gap-3">
                  {/* Community Stat Badge */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: channel.accentColor }} />
                      <span className="font-bold text-neutral-800">{channel.stat}</span>
                    </span>
                    <span className="text-[10px] text-neutral-400 font-sans">
                      {channel.statLabel[language]}
                    </span>
                  </div>

                  {/* Direct Action Link Button */}
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-ubuntu font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-200/80 bg-neutral-50/70 hover:text-white group/btn"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = channel.accentColor;
                      e.currentTarget.style.borderColor = channel.accentColor;
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <span>{channel.actionLabel[language]}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
