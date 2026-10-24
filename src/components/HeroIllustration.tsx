import { useState } from 'react';
import { motion } from 'motion/react';

export default function HeroIllustration() {
  const [imgIndex, setImgIndex] = useState(0);
  const possibleSources = [
    '/newhomescreen.webp',
    '/28803a84-117e-4ae2-9275-167631042220.webp',
    '/newhomescreen.png',
    '/homescreenforwebsite.png',
    '/28803a84-117e-4ae2-9275-167631042220.png',
    '/hero.png'
  ];

  const handleImageError = () => {
    setImgIndex((prev) => prev + 1);
  };

  if (imgIndex < possibleSources.length) {
    return (
      <div className="relative w-full flex items-center justify-center select-none p-1 sm:p-2 lg:p-0">
        {/* Soft Radial Ambient Glow behind Hero Image - Hidden on mobile for GPU efficiency */}
        <div className="hidden sm:block absolute inset-0 bg-radial from-[#FF5A36]/10 via-blue-500/5 to-transparent blur-3xl -z-10 pointer-events-none scale-110" />

        <div className="relative w-full flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            src={possibleSources[imgIndex]}
            loading="eager"
            decoding="async"
            {...({ fetchPriority: 'high' } as any)}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-auto max-h-[540px] sm:max-h-[600px] lg:max-h-[660px] xl:max-h-[720px] object-contain sm:drop-shadow-[0_16px_32px_rgba(26,26,26,0.1)] scale-[1.08] sm:scale-[1.12] lg:scale-[1.16] origin-center"
            alt="Robostorms students"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square flex items-center justify-center select-none p-2 sm:p-4">
      {/* Dynamic Background Coordinates & Math/Grid Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(26,26,26,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute w-[85%] h-[85%] rounded-full border border-neutral-100/50 pointer-events-none" />

      {/* Floating Animated Parent Wrapper */}
      <motion.div
        animate={{
          y: [-6, 6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[460px] drop-shadow-[0_14px_35px_rgba(26,26,26,0.06)]"
        >
          {/* DEFINITIONS & PATTERNS */}
          <defs>
            <linearGradient id="robotScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A1A1A" />
              <stop offset="100%" stopColor="#2E2E2E" />
            </linearGradient>
            <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#80D0FF" />
              <stop offset="100%" stopColor="#3AA8FF" />
            </linearGradient>
          </defs>

          {/* ==========================================
              1. SPEECH BUBBLE (TOP LEFT)
              ========================================== */}
          <motion.g
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Dark Bubble block */}
            <path
              d="M 50 115 C 50 100, 65 95, 80 95 L 140 95 C 155 95, 160 100, 160 115 L 160 145 C 160 155, 150 160, 135 160 L 115 160 L 100 178 L 100 160 C 70 160, 50 155, 50 115 Z"
              fill="#1A1A1A"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Bubble mock code/text lines */}
            <line x1="70" y1="115" x2="140" y2="115" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="127" x2="115" y2="127" stroke="#3AA8FF" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="139" x2="130" y2="139" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </motion.g>

          {/* ==========================================
              2. THE FLOATING ROBOT (LEFT SIDE)
              ========================================== */}
          <motion.g
            animate={{
              y: [-10, 8, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          >
            {/* Robot Hover Shadow circle underneath */}
            <ellipse cx="120" cy="380" rx="35" ry="5" fill="#1A1A1A" opacity="0.08" />

            {/* Segmented Left arm (waving back) */}
            <path
              d="M 80 250 C 45 270, 40 310, 75 345 C 78 348, 83 345, 81 340 C 55 315, 60 285, 90 262"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 80 250 C 45 270, 40 310, 75 345 C 78 348, 83 345, 81 340 C 55 315, 60 285, 90 262"
              fill="none"
              stroke="#4CB3FF"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Robot Chassis Body */}
            <path
              d="M 95 230 C 85 230, 75 255, 85 305 C 90 330, 110 345, 125 345 C 145 345, 160 330, 165 305 C 175 255, 165 230, 155 230 Z"
              fill="#FFFFFF"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Glowing circle emitter design */}
            <circle cx="125" cy="275" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="125" cy="275" r="11" fill="#4CB3FF" />
            <circle cx="121" cy="271" r="3" fill="#FFFFFF" opacity="0.8" />

            {/* Robot Skirt orange lower ring segment */}
            <path
              d="M 95 318 C 105 338, 145 338, 155 318 C 148 332, 102 332, 95 318 Z"
              fill="#FF5A36"
              stroke="#1C1A1A"
              strokeWidth="3"
            />

            {/* Head neck joint support */}
            <rect x="115" y="215" width="20" height="18" rx="4" fill="#2E2E2E" stroke="#1A1A1A" strokeWidth="3.5" />

            {/* Head casing sphere */}
            <rect x="85" y="160" width="80" height="64" rx="32" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />

            {/* Helmet top red visor crown */}
            <path
              d="M 95 174 C 110 160, 140 160, 155 174 C 150 168, 100 168, 95 174 Z"
              fill="#FF5A36"
              stroke="#1A1A1A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Head Ears / Side dials */}
            <rect x="74" y="180" width="12" height="20" rx="4" fill="#4CB3FF" stroke="#1A1A1A" strokeWidth="3" />
            <rect x="164" y="180" width="12" height="20" rx="4" fill="#4CB3FF" stroke="#1A1A1A" strokeWidth="3" />

            {/* Cyber Visor Screen */}
            <rect x="94" y="174" width="62" height="34" rx="12" fill="url(#robotScreen)" stroke="#1A1A1A" strokeWidth="2.5" />

            {/* Digital Blue Glowing Eyes */}
            <circle cx="111" cy="191" r="7" fill="#4CB3FF" />
            <circle cx="111" cy="191" r="3" fill="#FFFFFF" />
            <circle cx="139" cy="191" r="7" fill="#4CB3FF" />
            <circle cx="139" cy="191" r="3" fill="#FFFFFF" />

            {/* Visor speaker mouth dot */}
            <circle cx="125" cy="201" r="2.5" fill="#FFFFFF" opacity="0.8" />

            {/* Soft silver antenna curved */}
            <path d="M 125 160 Q 115 142, 122 135" fill="none" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
            {/* Top antenna signal orb */}
            <circle cx="122" cy="132" r="5" fill="#4CB3FF" stroke="#1A1A1A" strokeWidth="2.5" />

            {/* Segmented Right arm (pointing directly towards the board content) */}
            <path
              d="M 158 250 C 185 250, 205 235, 230 215 C 235 210, 234 204, 228 208 C 205 224, 185 236, 158 238"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 158 250 C 185 250, 205 235, 230 215 C 235 210, 234 204, 228 208 C 205 224, 185 236, 158 238"
              fill="none"
              stroke="#4CB3FF"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ==========================================
              3. MATHEMATICS WHITEBOARD (CENTER-TOP)
              ========================================== */}
          <g transform="translate(170, 95)">
            {/* Soft Board Back Drop shadow */}
            <rect x="6" y="6" width="186" height="120" rx="10" fill="#1A1A1A" opacity="0.08" />
            {/* Board Core Surface */}
            <rect x="0" y="0" width="186" height="120" rx="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />

            {/* Dynamic Graph grid inside */}
            {/* X-axis and Y-axis lines with neat arrows */}
            <path d="M 15 90 L 95 90 M 15 90 L 15 18" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            {/* Horizontal axis label mark tiny arrow */}
            <path d="M 92 87 L 96 90 L 92 93" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
            {/* Vertical axis label mark tiny arrow */}
            <path d="M 12 22 L 15 18 L 18 22" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />

            {/* Red Spline Wave Line path representing a trigonometric sine function */}
            <path
              d="M 15 90 Q 35 15, 55 90 T 95 90"
              fill="none"
              stroke="#FF5A36"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Elegant Mathematical notations and formulas */}
            {/* y = 1/3 x */}
            <text x="106" y="32" fontFamily="Ubuntu, system-ui, sans-serif" fontSize="13px" fontWeight="bold" fill="#1A1A1A" fontStyle="italic">
              y = ⅓ x
            </text>

            {/* x + y = ? */}
            <text x="30" y="108" fontFamily="Ubuntu, Georgia, serif" fontSize="12px" fontWeight="bold" fill="#1A1A1A" fontStyle="italic">
              x + y = ?
            </text>

            {/* Fraction representation circle pie chart */}
            <circle cx="140" cy="74" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
            {/* Colored segment (quarter slice) */}
            <path d="M 140 74 L 140 56 A 18 18 0 0 1 158 74 Z" fill="#FF5A36" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
          </g>

          {/* ==========================================
              4. STUDENT LEARNING ON LAPTOP (RIGHT SIDE)
              ========================================== */}
          <g>
            {/* Student floor shadow */}
            <ellipse cx="370" cy="425" rx="50" ry="6" fill="#1A1A1A" opacity="0.08" />

            {/* Left foot outstretched resting */}
            <path
              d="M 175 390 L 160 376 Q 155 350, 160 340 L 175 340"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            {/* Blue sneaker shoe on left */}
            <path
              d="M 148 376 C 144 366, 146 352, 164 345 C 168 350, 166 366, 154 376 Z"
              fill="#4CB3FF"
              stroke="#1A1A1A"
              strokeWidth="3"
            />

            {/* Leg lines (Pants segment) */}
            <path
              d="M 170 365 C 220 365, 270 362, 332 355 L 340 380 Q 250 395, 175 385 Z"
              fill="#FFFFFF"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Student Head & Hair */}
            {/* Dense beautiful deep navy/carbon hair */}
            <path
              d="M 330 200 C 310 190, 316 230, 320 250 C 324 266, 342 278, 355 272 C 372 268, 385 240, 385 205 C 385 170, 340 162, 330 200 Z"
              fill="#1A1A1A"
              stroke="#1A1A1A"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Face and neck */}
            <rect x="330" y="210" width="30" height="24" rx="10" fill="#FDD9C3" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="340" cy="225" r="14" fill="#FDD9C3" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M 334 238 C 334 246, 346 246, 346 238 Z" fill="#FDD9C3" stroke="#1A1A1A" strokeWidth="3" />

            {/* Happy Face expressions */}
            {/* Eye */}
            <circle cx="334" cy="224" r="2" fill="#1A1A1A" />
            {/* Happy Smile */}
            <path d="M 326 231 Q 330 235, 334 231" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

            {/* Hair bangs overlay */}
            <path
              d="M 328 206 C 324 195, 360 198, 355 214"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Main torso (Short sleeve sky-blue shirt) */}
            <path
              d="M 320 272 C 295 285, 290 320, 298 375 L 375 375 C 384 320, 375 285, 350 272 Z"
              fill="#4CB3FF"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Waving Right arm raised high interacting */}
            <path
              d="M 298 290 C 270 290, 245 264, 238 215 C 235 200, 245 195, 248 205 C 255 240, 275 272, 305 273"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 298 290 C 270 290, 245 264, 238 215 C 235 200, 245 195, 248 205 C 255 240, 275 272, 305 273"
              fill="none"
              stroke="#FDD9C3"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Hand fingers waved up */}
            <circle cx="236" cy="205" r="5" fill="#FDD9C3" stroke="#1A1A1A" strokeWidth="2" />

            {/* Laptop Base resting on thighs */}
            <rect x="275" y="360" width="85" height="12" rx="4" fill="#2E2E2E" stroke="#1A1A1A" strokeWidth="3" />

            {/* Red Coral Laptop Screen Cover */}
            <path
              d="M 185 305 L 275 305 L 280 361 L 190 361 Z"
              fill="#FF5A36"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Glowing Brand circle center of cover */}
            <circle cx="232" cy="333" r="8" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />

            {/* Left Arm operating Laptop */}
            <path
              d="M 350 290 C 330 298, 300 310, 290 345"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 350 290 C 330 298, 300 310, 290 345"
              fill="none"
              stroke="#FDD9C3"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* ==========================================
              5. VIDEO PLAY BADGE (TOP RIGHT)
              ========================================== */}
          <motion.g
            animate={{
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            transform="translate(350, 95)"
          >
            {/* White rounded card with border */}
            <rect x="0" y="0" width="105" height="42" rx="10" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.2" />

            {/* Blue Play Circle Button */}
            <circle cx="24" cy="21" r="11" fill="#4CB3FF" stroke="#1A1A1A" strokeWidth="2.2" />
            {/* Play Cursor Triangle */}
            <path d="M 22 17 L 28 21 L 22 25 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1" />

            {/* Inline play text metadata representations */}
            <line x1="44" y1="16" x2="90" y2="16" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="44" y1="26" x2="72" y2="26" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
          </motion.g>

          {/* ==========================================
              6. FLOOR UNDERLINE (BOTTOM HORIZONTAL BAR)
              ========================================== */}
          <rect
            x="48"
            y="405"
            width="412"
            height="18"
            rx="9"
            fill="#4CB3FF"
            stroke="#1A1A1A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
