import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const glowRef = useRef(null);

  // Magnetic button effect
  const onMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(btnRef.current?.parentElement,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // Glow intensifies on scroll into view
    gsap.fromTo(glowRef.current,
      { opacity: 0.2, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
      }
    );

    return () => ScrollTrigger.getAll()
      .filter(t => [section, headingRef.current].includes(t.vars.trigger))
      .forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '9rem 1.5rem',
        background: '#0B0F14',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2
          ref={headingRef}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
            opacity: 0,
          }}
        >
          Interested in what{' '}
          <br />
          <span className="gradient-text">CEYEL is building?</span>
        </h2>

        <div style={{ display: 'inline-block', opacity: 0 }}>
          <a
            ref={btnRef}
            href="mailto:hello@ceyel.co.in"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.9rem 2rem',
              background: '#fff',
              color: '#0B0F14',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'background 0.25s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
              boxShadow: '0 0 0 rgba(255,255,255,0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.12), 0 0 80px rgba(99,102,241,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(255,255,255,0)';
              onMouseLeave();
            }}
            onMouseMove={onMouseMove}
          >
            Get in Touch
            <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
          </a>
        </div>
      </div>

      {/* Accent glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          opacity: 0.2,
        }}
      />
    </section>
  );
};

export default CallToAction;
