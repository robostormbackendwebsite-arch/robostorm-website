import { useState, useEffect } from 'react';

/**
 * Lightweight, high-performance hook to detect mobile screen width (< 768px).
 * Uses window.matchMedia for zero-overhead event listening (no scroll or resize thrashing).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    // Initial check
    setIsMobile(mediaQuery.matches);

    // Modern listener with backward-compatible fallback
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Legacy Safari support
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isMobile;
}
