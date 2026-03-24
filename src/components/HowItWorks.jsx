import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  'Raw Data',
  'Event Intelligence',
  'Pattern Discovery',
  'Predictive Understanding',
  'Actionable Decisions',
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const nodeRefs = useRef([]);
  const pulseRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title fade-in
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );

    // Line draw
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
      }
    );

    // Nodes stagger
    nodeRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 32, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Scroll-driven pulse (moves pulse dot across the line on scroll)
    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 1.5,
      onUpdate: (self) => {
        if (pulseRef.current) {
          pulseRef.current.style.left = `${self.progress * 100}%`;
        }
      },
    });

    return () => ScrollTrigger.getAll()
      .filter(t => t.vars.trigger === section || t.vars.trigger === titleRef.current)
      .forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '7rem 1.5rem',
        background: '#0B0F14',
        borderTop: '1px solid rgba(31,41,51,0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dark vignette gradient for mood */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff' }}>
            From Chaos to Clarity
          </h2>
        </div>

        {/* Flow bar */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0' }}>
          {/* Base line */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '0',
            width: '100%',
            height: '1px',
            background: 'rgba(31,41,51,0.8)',
          }} />

          {/* Animated line fill */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '0',
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, rgba(99,102,241,0.6), rgba(34,211,238,0.6))',
              transformOrigin: 'left center',
              scaleX: 0,
            }}
          />

          {/* Scroll-driven pulse dot */}
          <div
            ref={pulseRef}
            style={{
              position: 'absolute',
              top: 'calc(2rem - 4px)',
              left: '0%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#6366F1',
              boxShadow: '0 0 12px rgba(99,102,241,0.8)',
              transform: 'translateX(-50%)',
              transition: 'left 0.05s linear',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (nodeRefs.current[i] = el)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                opacity: 0,
                flex: 1,
              }}
            >
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '14px',
                background: 'rgba(17,24,39,0.9)',
                border: '1px solid rgba(31,41,51,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(31,41,51,0.9)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
                }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#6366F1',
                  boxShadow: '0 0 8px rgba(99,102,241,0.6)',
                }} />
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textAlign: 'center',
                maxWidth: '80px',
                lineHeight: 1.4,
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
