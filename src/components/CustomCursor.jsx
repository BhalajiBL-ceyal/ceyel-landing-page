import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Disable custom cursor on mobile touching devices

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Global cursor hiding is assumed to be in index.css
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Avoid rendering on mobile at all if we have a matchMedia
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference'
        }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: '1px solid rgba(99,102,241,0.6)',
          backgroundColor: isHovered ? 'rgba(99,102,241,0.15)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          backdropFilter: isHovered ? 'blur(4px)' : 'none'
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
