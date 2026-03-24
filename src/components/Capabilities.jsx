import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, Activity, BarChart3, Zap, GitBranch, Cpu, Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { title: 'Process Discovery', icon: Search },
  { title: 'Bottleneck Detection', icon: Activity },
  { title: 'Performance Insights', icon: BarChart3 },
  { title: 'Predictive Analysis', icon: Zap },
  { title: 'Scenario Simulation', icon: GitBranch },
  { title: 'Digital Twin–Ready', icon: Cpu },
  { title: 'Decision Support', icon: Layers },
];

const CapabilityCard = ({ title, icon: Icon, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7,
        delay: index * 0.06,
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
      ref={ref}
      style={{
        padding: '1.5rem',
        borderRadius: '14px',
        background: 'rgba(17,24,39,0.6)',
        border: '1px solid rgba(31,41,51,0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: 0,
        cursor: 'default',
        transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(17,24,39,0.9)';
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
        e.currentTarget.style.boxShadow = '0 0 28px rgba(99,102,241,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(17,24,39,0.6)';
        e.currentTarget.style.borderColor = 'rgba(31,41,51,0.8)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '10px',
        background: 'rgba(11,15,20,0.9)',
        border: '1px solid rgba(31,41,51,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.3s, background 0.3s',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
          e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(31,41,51,0.8)';
          e.currentTarget.style.background = 'rgba(11,15,20,0.9)';
        }}
      >
        <Icon style={{ width: '1.1rem', height: '1.1rem', color: '#6B7280', transition: 'color 0.3s' }} />
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E7EB' }}>{title}</h3>
    </div>
  );
};

const Capabilities = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
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
      {/* Subtle grid mesh background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          ref={headingRef}
          style={{ marginBottom: '3rem', opacity: 0 }}
        >
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Core Capabilities
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Engineered for total operational awareness.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {capabilities.map((cap, i) => (
            <CapabilityCard key={i} title={cap.title} icon={cap.icon} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
