import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 40;
const MOBILE_BREAKPOINT = 768;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // No particles on mobile
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      size: randomBetween(0.5, 2),
      speedY: randomBetween(0.1, 0.4),
      speedX: randomBetween(-0.08, 0.08),
      opacity: randomBetween(0.05, 0.35),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    let rafId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Slow drift
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacityDir * 0.002;

        if (p.opacity >= 0.35) p.opacityDir = -1;
        if (p.opacity <= 0.02) p.opacityDir = 1;

        // Wrap around edges
        if (p.y < -4) p.y = height + 4;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`; // indigo glow
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
};

export default ParticleField;
