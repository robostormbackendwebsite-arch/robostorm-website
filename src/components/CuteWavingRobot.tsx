import React from 'react';

interface CuteWavingRobotProps {
  className?: string;
  size?: number; // size in pixels, default 48
  isWaving?: boolean;
  showShadow?: boolean;
}

export default function CuteWavingRobot({
  className = '',
  size = 48,
  isWaving = true,
  showShadow = true,
}: CuteWavingRobotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Metallic / Ceramic Robot Body Gradient */}
          <linearGradient id="robotBodyGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.55" stopColor="#F3F5F7" />
            <stop offset="1" stopColor="#D5DCE2" />
          </linearGradient>

          {/* Deep Visor Screen Gradient */}
          <linearGradient id="robotVisorGrad" x1="25" y1="35" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0A1128" />
            <stop offset="0.7" stopColor="#131F37" />
            <stop offset="1" stopColor="#1C2D4E" />
          </linearGradient>

          {/* Signature Robostorms Orange Gradient */}
          <linearGradient id="robotOrangeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FF7A59" />
            <stop offset="1" stopColor="#FF5A36" />
          </linearGradient>

          {/* Glowing Cyan Eyes Gradient */}
          <linearGradient id="robotEyeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#67E8F9" />
            <stop offset="0.6" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>

          {/* Soft Glow Filter */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Eye Cyan Neon Filter */}
          <filter id="eyeNeon" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes cuteRobotFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-4px) rotate(1.2deg);
            }
          }

          @keyframes cuteShadowScale {
            0%, 100% {
              transform: scale(1);
              opacity: 0.22;
            }
            50% {
              transform: scale(0.82);
              opacity: 0.12;
            }
          }

          @keyframes cuteRobotWave {
            0%, 100% {
              transform: rotate(0deg);
            }
            15% {
              transform: rotate(-26deg);
            }
            30% {
              transform: rotate(12deg);
            }
            45% {
              transform: rotate(-20deg);
            }
            60% {
              transform: rotate(10deg);
            }
            75% {
              transform: rotate(-14deg);
            }
          }

          @keyframes cuteEyeBlink {
            0%, 88%, 94%, 100% {
              transform: scaleY(1);
            }
            91% {
              transform: scaleY(0.08);
            }
          }

          @keyframes beaconPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.35;
              transform: scale(1.35);
            }
          }

          .animate-cute-float {
            animation: cuteRobotFloat 3s ease-in-out infinite;
            transform-origin: 50% 65%;
          }

          .animate-cute-shadow {
            animation: cuteShadowScale 3s ease-in-out infinite;
            transform-origin: 50px 94px;
          }

          .animate-cute-wave {
            animation: cuteRobotWave 2.2s ease-in-out infinite;
            transform-origin: 70px 65px;
            transform-box: view-box;
          }

          .group:hover .animate-cute-wave {
            animation-duration: 1.2s;
          }

          .animate-eye-blink {
            animation: cuteEyeBlink 4s ease-in-out infinite;
            transform-origin: 50px 45px;
            transform-box: view-box;
          }

          .animate-beacon {
            animation: beaconPulse 1.5s ease-in-out infinite;
            transform-origin: 50px 14px;
            transform-box: view-box;
          }
        `}</style>

        {/* PERSPECTIVE GROUND SHADOW */}
        {showShadow && (
          <ellipse
            cx="50"
            cy="93"
            rx="18"
            ry="3.5"
            fill="#0F172A"
            className="animate-cute-shadow"
          />
        )}

        {/* MAIN ROBOT WRAPPER (Floating Animation) */}
        <g className="animate-cute-float">

          {/* ANTENNA STEM & GLOWING TIP */}
          <line x1="50" y1="14" x2="50" y2="25" stroke="#94A3B8" strokeWidth="2.8" strokeLinecap="round" />
          {/* Signal beacon pulse rings */}
          <circle cx="50" cy="14" r="7.5" fill="#FF5A36" opacity="0.25" className="animate-beacon" />
          <circle cx="50" cy="14" r="4.2" fill="url(#robotOrangeGrad)" filter="url(#softGlow)" />
          <circle cx="48.5" cy="12.5" r="1.4" fill="#FFFFFF" opacity="0.85" />

          {/* LEFT EAR POD (Round Sci-Fi headphone) */}
          <rect x="16" y="37" width="7" height="16" rx="3.5" fill="#475569" />
          <rect x="17.5" y="40" width="4" height="10" rx="2" fill="url(#robotOrangeGrad)" />

          {/* RIGHT EAR POD */}
          <rect x="77" y="37" width="7" height="16" rx="3.5" fill="#475569" />
          <rect x="78.5" y="40" width="4" height="10" rx="2" fill="url(#robotOrangeGrad)" />

          {/* ROBOT TORSO / BODY */}
          <rect
            x="32"
            y="63"
            width="36"
            height="26"
            rx="13"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Torso Belly Screen / Core Indicator */}
          <rect x="41" y="69" width="18" height="12" rx="4" fill="#0B132B" />
          {/* Robostorms Orange Core Light */}
          <circle cx="50" cy="75" r="3.2" fill="url(#robotOrangeGrad)" filter="url(#softGlow)" />
          <circle cx="49" cy="74" r="1.1" fill="#FFF" opacity="0.9" />

          {/* LEFT RESTING ARM */}
          <g>
            <path
              d="M32 67 Q23 71 25 79"
              stroke="url(#robotBodyGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="25" cy="79" r="3.5" fill="#94A3B8" />
          </g>

          {/* HEAD CAPSULE */}
          <rect
            x="22"
            y="24"
            width="56"
            height="43"
            rx="18"
            fill="url(#robotBodyGrad)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Head Top Specular Highlight */}
          <path
            d="M32 28 Q50 25 68 28"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* VISOR (Dark Face Screen) */}
          <rect
            x="27"
            y="31"
            width="46"
            height="28"
            rx="12"
            fill="url(#robotVisorGrad)"
            stroke="#1E293B"
            strokeWidth="1.5"
          />
          {/* Visor Glass Gloss Curve Reflection */}
          <path
            d="M30 34 Q45 32 63 36"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* CUTE GLOWING CYAN EYES (Blinking Animation) */}
          <g className="animate-eye-blink">
            {/* Left Eye */}
            <g filter="url(#eyeNeon)">
              <ellipse cx="40" cy="45" rx="4.5" ry="5.5" fill="url(#robotEyeGlow)" />
              {/* Eye Catchlight (Sparkle) */}
              <circle cx="38.5" cy="43" r="1.8" fill="#FFFFFF" />
              <circle cx="42" cy="47" r="0.8" fill="#FFFFFF" opacity="0.85" />
            </g>

            {/* Right Eye */}
            <g filter="url(#eyeNeon)">
              <ellipse cx="60" cy="45" rx="4.5" ry="5.5" fill="url(#robotEyeGlow)" />
              {/* Eye Catchlight (Sparkle) */}
              <circle cx="58.5" cy="43" r="1.8" fill="#FFFFFF" />
              <circle cx="62" cy="47" r="0.8" fill="#FFFFFF" opacity="0.85" />
            </g>

            {/* Cute Smile Curve */}
            <path
              d="M46 51 Q50 54.5 54 51"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </g>

          {/* CUTE CHEEKS (Soft Coral Blush) */}
          <circle cx="33" cy="51" r="2.6" fill="#FF5A36" opacity="0.4" />
          <circle cx="67" cy="51" r="2.6" fill="#FF5A36" opacity="0.4" />

          {/* RIGHT WAVING ARM (Interactive Friendly Wave) */}
          <g className={isWaving ? 'animate-cute-wave' : ''}>
            {/* Shoulder to elbow to raised hand */}
            <path
              d="M68 66 Q74 58 76 46 Q77 37 74 31"
              stroke="url(#robotBodyGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cute Mitten Hand */}
            <circle cx="74" cy="29" r="4.5" fill="#94A3B8" />
            {/* Little waving thumb */}
            <circle cx="70.5" cy="30" r="2" fill="#64748B" />
          </g>

        </g>
      </svg>
    </div>
  );
}
