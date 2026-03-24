import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Statement = ({ children, align = 'center', index = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 70, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.8,
        },
      }
    );

    return () => ScrollTrigger.getAll().filter(t => t.vars.trigger === el).forEach(t => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: '56rem',
        margin: '0 auto',
        padding: '6rem 0',
        textAlign: align,
        opacity: 0,
        position: 'relative',
      }}
    >
      {/* Subtle decorative line */}
      {index > 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)',
        }} />
      )}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: '#E5E7EB',
      }}>
        {children}
      </h2>
    </div>
  );
};

const Philosophy = () => {
  return (
    <section className="w-full bg-background relative z-10 px-6 pb-16 section-fade-top">
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <Statement index={0}>
          Complex processes hide{' '}
          <span style={{ color: '#6B7280' }}>invisible inefficiencies.</span>
        </Statement>

        <Statement index={1}>
          Data exists everywhere.{' '}
          <span style={{ color: '#6366F1' }}>Insight doesn't.</span>
        </Statement>

        <Statement index={2}>
          Decisions deserve{' '}
          <span style={{
            color: '#fff',
            borderBottom: '1px solid rgba(99,102,241,0.4)',
            paddingBottom: '4px',
          }}>clarity</span>.
        </Statement>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'breathe 8s ease-in-out infinite',
      }} />
    </section>
  );
};

export default Philosophy;
