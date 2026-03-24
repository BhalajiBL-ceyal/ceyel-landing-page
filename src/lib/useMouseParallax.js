import { useEffect, useRef } from 'react';

/**
 * useMouseParallax — tracks mouse position normalized to [-1, 1] range.
 * Updates are throttled via requestAnimationFrame to avoid layout thrash.
 * Returns a ref { x, y } so consumers don't re-render on mouse move.
 */
export function useMouseParallax() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const onMouseMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, 0.06);
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, 0.06);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mouseRef;
}
