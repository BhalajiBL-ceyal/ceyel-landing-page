import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    title: 'Data Layer',
    description: 'Ingests raw operational data from any source.',
    accent: 'rgba(99,102,241,0.35)',
    border: 'rgba(99,102,241,0.18)',
  },
  {
    title: 'Intelligence Layer',
    description: 'Structures chaotic events into coherent flows.',
    accent: 'rgba(99,102,241,0.28)',
    border: 'rgba(99,102,241,0.15)',
  },
  {
    title: 'Analysis Layer',
    description: 'Identifies bottlenecks, loops, and deviations instantly.',
    accent: 'rgba(99,102,241,0.22)',
    border: 'rgba(99,102,241,0.12)',
  },
  {
    title: 'Simulation Layer',
    description: "Tests 'what-if' scenarios before real-world implementation.",
    accent: 'rgba(34,211,238,0.18)',
    border: 'rgba(34,211,238,0.12)',
  },
  {
    title: 'Decision Layer',
    description: 'Recommends actionable interventions with predicted impact.',
    accent: 'rgba(34,211,238,0.22)',
    border: 'rgba(34,211,238,0.15)',
  },
  {
    title: 'Visualization Layer',
    description: 'Presents complex systems as intuitive, interactive maps.',
    accent: 'rgba(34,211,238,0.28)',
    border: 'rgba(34,211,238,0.18)',
  },
];

const LayerCard = ({ layer, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 48, scale: 0.96, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        delay: index * 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => ScrollTrigger.getAll().filter(t => t.vars.trigger === el).forEach(t => t.kill());
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto 1rem',
        padding: '1.75rem 2rem',
        borderRadius: '16px',
        border: `1px solid ${layer.border}`,
        background: 'rgba(17,24,39,0.7)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: 0,
        transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(17,24,39,0.9)';
        e.currentTarget.style.borderColor = layer.accent;
        e.currentTarget.style.boxShadow = `0 0 30px ${layer.accent.replace('0.35', '0.12')}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(17,24,39,0.7)';
        e.currentTarget.style.borderColor = layer.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Glow accent corner */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '120px',
        height: '120px',
        background: `radial-gradient(circle, ${layer.accent} 0%, transparent 70%)`,
        pointerEvents: 'none',
        borderRadius: '50%',
        filter: 'blur(20px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>
          {layer.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: '36rem', lineHeight: 1.6 }}>
          {layer.description}
        </p>
      </div>

      <div style={{
        flexShrink: 0,
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.7rem',
        fontFamily: 'monospace',
        position: 'relative',
        zIndex: 1,
      }}>
        0{index + 1}
      </div>
    </div>
  );
};

const PlatformLayers = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <section style={{
      padding: '7rem 1.5rem',
      background: '#0B0F14',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: 0 }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          The Intelligence Stack
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Built to understand depth.</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {layers.map((layer, i) => <LayerCard key={i} layer={layer} index={i} />)}
      </div>

      {/* Vertical thread line */}
      <div style={{
        position: 'absolute',
        top: '7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1px',
        height: 'calc(100% - 7rem)',
        background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.12), transparent)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
    </section>
  );
};

export default PlatformLayers;
