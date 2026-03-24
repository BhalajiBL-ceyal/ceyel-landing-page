import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductIntro = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(el.children,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => ScrollTrigger.getAll().filter(t => t.vars.trigger === sectionRef.current).forEach(t => t.kill());
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '12rem 1.5rem',
      backgroundColor: '#0B0F14',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }} ref={textRef}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 600,
          color: '#E5E7EB',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '2rem'
        }}>
          Meet the hardware <br />
          that powers the <span style={{ color: '#6366F1' }}>edge.</span>
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#9CA3AF',
          lineHeight: 1.7,
        }}>
          Before data reaches the cloud, it must be captured, parsed, and understood. 
          The CEYEL Edge node is a matte-black industrial marvel designed to ingest 
          operations at source. No latency. No blind spots.
        </p>
      </div>
    </section>
  );
};

export default ProductIntro;
