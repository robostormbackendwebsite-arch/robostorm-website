import React from 'react';

const LOGO_FULL = '/robostorms-logo.png';
const LOGO_NO_SLOGAN = '/robostorms-logo-noslogan.png';

interface RobostormsLogoProps {
  className?: string;
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'form';
}

export default function RobostormsLogo({ 
  className = '', 
  showSlogan = true,
  size = 'md'
}: RobostormsLogoProps) {
  const logoSrc = showSlogan ? LOGO_FULL : LOGO_NO_SLOGAN;

  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-14 sm:h-16 md:h-[4.25rem]', // bigger and more prominent on navigation bar
    lg: 'h-16 sm:h-20',
    form: 'h-10 sm:h-11' // unchanged for modals & forms
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Robostorms - New Era of Technology"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
        draggable={false}
      />
    </div>
  );
}
