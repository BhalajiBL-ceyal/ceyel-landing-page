import React, { useRef, useEffect } from 'react';
import { useMouseParallax } from '../lib/useMouseParallax';

const NetworkBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useMouseParallax(); // returns {current: {x, y}} normalized [-1, 1]

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Configuration
    const particleCount = 70;
    const maxDistance = 150;
    let particles = [];

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse position mapped to canvas coordinates
      const mx = (mouse.current.x * 0.5 + 0.5) * canvas.width;
      const my = (mouse.current.y * 0.5 + 0.5) * canvas.height;

      // Update and draw particles
      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse repelling (subtle)
        const dxMouse = mx - p.x;
        const dyMouse = my - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          const force = (200 - distMouse) / 200;
          p.x -= (dxMouse / distMouse) * force * 0.5;
          p.y -= (dyMouse / distMouse) * force * 0.5;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.fill();

        // Connect lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity based on distance
            const opacity = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  // Disable on mobile completely for performance
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
};

export default NetworkBackground;
