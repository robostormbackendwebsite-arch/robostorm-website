import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

interface CardsRowProps {
  onCardClick?: (type: 'students' | 'labs' | 'teachers' | 'atl') => void;
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  isMarathi?: boolean;
}

function formatNumber(num: number, isMarathi: boolean): string {
  const str = num.toLocaleString('en-IN');
  if (!isMarathi) return str;

  const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return str.replace(/\d/g, (d) => marathiDigits[parseInt(d, 10)]);
}

function AnimatedCounter({ end, duration = 2000, suffix = '+', isMarathi = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count, isMarathi)}
      {suffix}
    </span>
  );
}

export default function CardsRow({ onCardClick }: CardsRowProps) {
  const { language, t } = useLanguage();
  const isMarathi = language === 'mr';
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={isMobile ? undefined : containerVariants}
      initial={isMobile ? false : "hidden"}
      whileInView={isMobile ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mt-4"
    >
      {/* CARD 1: STUDENTS ENGAGED - WHITE BOX */}
      <motion.div
        variants={isMobile ? undefined : cardVariants}
        whileHover={isMobile ? undefined : { y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => onCardClick?.('students')}
        className="bg-white border-2 border-neutral-900 rounded-[1.3rem] p-3 sm:p-3.5 flex flex-col justify-between min-h-[110px] sm:min-h-[120px] w-full cursor-pointer transition-shadow shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] text-left"
      >
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[#B59DFB] text-white font-ubuntu font-bold text-[9px] sm:text-[10px] rounded-full border border-neutral-900/15 leading-none shadow-sm uppercase">
            {t('stats.studentsBadge')}
          </span>
        </div>
        
        <div className="mt-2 flex flex-col justify-end text-left leading-tight">
          <span className="text-lg xs:text-xl sm:text-[1.45rem] font-ubuntu font-bold text-neutral-950 tracking-tight leading-none">
            <AnimatedCounter end={500000} duration={2000} suffix="+" isMarathi={isMarathi} />
          </span>
          <span className="text-neutral-800 font-ubuntu font-bold text-[10px] sm:text-[11px] tracking-tight uppercase leading-tight mt-1.5">
            {t('stats.studentsEngagedLabel')}
          </span>
          <span className="text-neutral-500 font-medium text-[9px] sm:text-[10px] leading-tight mt-0.5">
            {t('stats.studentsEngagedSub')}
          </span>
        </div>
      </motion.div>

      {/* CARD 2: LABS ESTABLISHED - WHITE BOX */}
      <motion.div
        variants={isMobile ? undefined : cardVariants}
        whileHover={isMobile ? undefined : { y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => onCardClick?.('labs')}
        className="bg-white border-2 border-neutral-900 rounded-[1.3rem] p-3 sm:p-3.5 flex flex-col justify-between min-h-[110px] sm:min-h-[120px] w-full cursor-pointer transition-shadow shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] text-left"
      >
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[#FFCD38] text-neutral-950 font-ubuntu font-bold text-[9px] sm:text-[10px] rounded-full border border-neutral-900/15 leading-none shadow-sm uppercase">
            {t('stats.labsBadge')}
          </span>
        </div>

        <div className="mt-2 flex flex-col justify-end text-left leading-tight">
          <span className="text-lg xs:text-xl sm:text-[1.45rem] font-ubuntu font-bold text-neutral-950 tracking-tight leading-none">
            <AnimatedCounter end={2500} duration={1800} suffix="+" isMarathi={isMarathi} />
          </span>
          <span className="text-neutral-800 font-ubuntu font-bold text-[10px] sm:text-[11px] tracking-tight uppercase leading-tight mt-1.5">
            {t('stats.labsEstablishedLabel')}
          </span>
          <span className="text-neutral-500 font-medium text-[9px] sm:text-[10px] leading-tight mt-0.5">
            {t('stats.labsEstablishedSub')}
          </span>
        </div>
      </motion.div>

      {/* CARD 3: TEACHERS TRAINED - WHITE BOX */}
      <motion.div
        variants={isMobile ? undefined : cardVariants}
        whileHover={isMobile ? undefined : { y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => onCardClick?.('teachers')}
        className="bg-white border-2 border-neutral-900 rounded-[1.3rem] p-3 sm:p-3.5 flex flex-col justify-between min-h-[110px] sm:min-h-[120px] w-full cursor-pointer transition-shadow shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] text-left"
      >
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-emerald-400 text-neutral-950 font-ubuntu font-bold text-[9px] sm:text-[10px] rounded-full border border-neutral-900/15 leading-none shadow-sm uppercase">
            {t('stats.teachersBadge')}
          </span>
        </div>

        <div className="mt-2 flex flex-col justify-end text-left leading-tight">
          <span className="text-lg xs:text-xl sm:text-[1.45rem] font-ubuntu font-bold text-neutral-950 tracking-tight leading-none">
            <AnimatedCounter end={15000} duration={1900} suffix="+" isMarathi={isMarathi} />
          </span>
          <span className="text-neutral-800 font-ubuntu font-bold text-[10px] sm:text-[11px] tracking-tight uppercase leading-tight mt-1.5">
            {t('stats.teachersTrainedLabel')}
          </span>
          <span className="text-neutral-500 font-medium text-[9px] sm:text-[10px] leading-tight mt-0.5">
            {t('stats.teachersTrainedSub')}
          </span>
        </div>
      </motion.div>

      {/* CARD 4: ATL & STEAM LABS IMPLEMENTED - WHITE BOX */}
      <motion.div
        variants={isMobile ? undefined : cardVariants}
        whileHover={isMobile ? undefined : { y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => onCardClick?.('atl')}
        className="bg-white border-2 border-neutral-900 rounded-[1.3rem] p-3 sm:p-3.5 flex flex-col justify-between min-h-[110px] sm:min-h-[120px] w-full cursor-pointer transition-shadow shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] text-left"
      >
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[#FF5A36] text-white font-ubuntu font-bold text-[9px] sm:text-[10px] rounded-full border border-neutral-900/15 leading-none shadow-sm uppercase">
            {t('stats.atlBadge')}
          </span>
        </div>

        <div className="mt-2 flex flex-col justify-end text-left leading-tight">
          <span className="text-lg xs:text-xl sm:text-[1.45rem] font-ubuntu font-bold text-neutral-950 tracking-tight leading-none">
            <AnimatedCounter end={150} duration={1600} suffix="+" isMarathi={isMarathi} />
          </span>
          <span className="text-neutral-800 font-ubuntu font-bold text-[10px] sm:text-[11px] tracking-tight uppercase leading-tight mt-1.5">
            {t('stats.atlStemLabel')}
          </span>
          <span className="text-neutral-500 font-medium text-[9px] sm:text-[10px] leading-tight mt-0.5">
            {t('stats.atlStemSub')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
