import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

/**
 * useLenis — initializes Lenis smooth scroll and integrates with GSAP ticker.
 * On mobile (window.innerWidth ≤ 768) Lenis is not created — native scroll is used.
 * Returns the Lenis instance ref so consumers can read lenis.scroll if needed.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Skip smooth scroll on mobile for performance
    if (window.innerWidth <= 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis RAF with GSAP ticker for ScrollTrigger compatibility
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
