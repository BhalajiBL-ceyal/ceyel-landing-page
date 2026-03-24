import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    text: '"Ceyel started with a simple observation:',
    highlight: 'complex systems generate data, but clarity is rare."',
    highlightFirst: false,
  },
  {
    text: 'Most decisions remain reactive.',
    highlight: 'We believe intelligence should be proactive, explainable, and actionable.',
    highlightFirst: false,
  },
  {
    text: 'Ceyel is being built to understand processes the way humans do —',
    highlight: 'but at system scale.',
    highlightFirst: false,
  },
];

const Para = ({ text, highlight, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          end: 'top 45%',
          scrub: 0.6,
        },
      }
    );

    return () => ScrollTrigger.getAll().filter(t => t.vars.trigger === el).forEach(t => t.kill());
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: '3.5rem' }}>
      <p style={{
        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
        lineHeight: 1.75,
        color: '#6B7280',
        textAlign: 'center',
      }}>
        {text}{' '}
        <span style={{ color: '#E5E7EB' }}>{highlight}</span>
      </p>
    </div>
  );
};

const FounderNarrative = () => {
  const labelRef = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );

    gsap.fromTo(closingRef.current,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: closingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <section style={{
      padding: '9rem 1.5rem',
      background: '#0B0F14',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div ref={labelRef} style={{ marginBottom: '3.5rem', opacity: 0 }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#6366F1',
          }}>
            Why CEYEL Exists
          </span>
        </div>

        {paragraphs.map((p, i) => (
          <Para key={i} {...p} index={i} />
        ))}

        <div ref={closingRef} style={{ paddingTop: '2.5rem', opacity: 0 }}>
          {/* Decorative line */}
          <div style={{
            width: '40px',
            height: '1px',
            background: 'rgba(99,102,241,0.5)',
            margin: '0 auto 2.5rem',
          }} />
          <p style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.4,
          }}>
            This is not about dashboards.{' '}
            <br />
            <span style={{ color: '#9CA3AF' }}>It's about better decisions.</span>
          </p>
        </div>
      </div>

      {/* Pulsing ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'breathe 8s ease-in-out infinite',
      }} />
    </section>
  );
};

export default FounderNarrative;
