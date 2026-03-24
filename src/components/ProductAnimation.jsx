import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import ParticleField from './ParticleField';
import {
  buildFramePaths,
  preloadImages,
  scrollToFrameIndex,
  getScrollStage,
} from '../lib/animation';
import { useMouseParallax } from '../lib/useMouseParallax';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 48;
const LERP_SPEED = 0.10;
const isMobile = () => window.innerWidth <= 768;

const ProductAnimation = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const bgGridRef = useRef(null);
  const ambientRef = useRef(null);
  
  // Hotspot Refs removed per Phase 12 Cinematic Upgrade

  const imagesRef = useRef([]);
  const rafRef = useRef(null);
  const currentFrameRef = useRef(0);
  const scrollProgressRef = useRef(0);

  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const mouse = useMouseParallax();

  // ── Three.js Refs ─────────────────────────────────────────────────────────
  const engineRef = useRef({
    renderer: null,
    composer: null,
    bloomPass: null,
    material: null,
    texture: null,
    camera: null,
    dpr: 1,
    framesDropped: 0
  });

  // ── Init WebGL ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true
    });
    
    // Initial pixel ratio
    const dpr = window.devicePixelRatio || 1;
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    engineRef.current.renderer = renderer;
    engineRef.current.dpr = dpr;

    // Setup Scene & Camera (Orthographic for perfect 2D fit)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    engineRef.current.camera = camera;

    // Setup Geometry & Material
    const texture = new THREE.Texture();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    engineRef.current.texture = texture;

    const material = new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: true 
    });
    engineRef.current.material = material;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    // Setup Post-Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0,    // strength initially 0
      0.5,  // radius
      0.65  // threshold (only glowing parts of the frame bloom)
    );
    composer.addPass(bloomPass);
    
    engineRef.current.composer = composer;
    engineRef.current.bloomPass = bloomPass;

    return () => {
      renderer.dispose();
      composer.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  // ── Canvas resize ──────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const engine = engineRef.current;
    if (!engine.renderer) return;
    
    engine.renderer.setSize(window.innerWidth, window.innerHeight);
    engine.composer.setSize(window.innerWidth, window.innerHeight);
    
    // Scale texture to cover screen via uniforms/geometry if aspect differs,
    // but doing it visually via CSS is cheaper. The actual Ortho camera covers -1 to 1.
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }, []);

  // ── Main render loop ───────────────────────────────────────────────────────
  const renderLoop = useCallback((time) => {
    const section = sectionRef.current;
    const engine = engineRef.current;
    const bgGrid = bgGridRef.current;
    const ambient = ambientRef.current;
    const canvasWrap = canvasWrapRef.current;

    if (!section || !engine.composer) {
      rafRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // Adaptive Performance: Monitor FPS
    if (engine.lastTime) {
      const delta = time - engine.lastTime;
      if (delta > 32) { // Dropping below ~30fps
        engine.framesDropped++;
        if (engine.framesDropped > 10 && engine.dpr > 1) {
          // Downscale to save GPU
          engine.dpr = Math.max(1, engine.dpr - 0.25);
          engine.renderer.setPixelRatio(engine.dpr);
          engine.framesDropped = 0;
          console.warn('Adaptive Performance: Lowering pixelRatio to', engine.dpr);
        }
      } else {
        engine.framesDropped = Math.max(0, engine.framesDropped - 1);
      }
    }
    engine.lastTime = time;

    // ── Scroll progress ──────────────────────────────────────────────────────
    const sectionTop = section.offsetTop;
    const sectionScrollHeight = section.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, window.scrollY - sectionTop);
    const progress = sectionScrollHeight > 0
      ? Math.min(1, scrolled / sectionScrollHeight)
      : 0;
    scrollProgressRef.current = progress;

    // ── Frame lerp ───────────────────────────────────────────────────────────
    currentFrameRef.current = scrollToFrameIndex(
      progress, FRAME_COUNT, currentFrameRef.current, LERP_SPEED
    );
    const frameIdx = Math.round(currentFrameRef.current);

    // ── Story stage (Lighting / Bloom) ───────────────────────────────────────
    const { stage, t } = getScrollStage(progress);
    let bloomStrength = 0;

    if (stage === 1) bloomStrength = t * 1.5;
    if (stage === 2) bloomStrength = 1.5 + t * 0.5;
    if (stage === 3) bloomStrength = (1 - t) * 2.0;

    engine.bloomPass.strength = bloomStrength;

    // ── Update Texture ───────────────────────────────────────────────────────
    const img = imagesRef.current[frameIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      if (engine.texture.image !== img) {
        engine.texture.image = img;
        
        // Correct aspect ratio scaling on the material
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        
        // "Cover" behavior in webgl texture
        const screenAspect = cw / ch;
        const imgAspect = iw / ih;
        
        if (screenAspect > imgAspect) {
          // Screen is wider than image
          const scale = imgAspect / screenAspect;
          engine.texture.repeat.set(1, scale);
          engine.texture.offset.set(0, (1 - scale) / 2);
        } else {
           // Screen is taller than image
          const scale = screenAspect / imgAspect;
          engine.texture.repeat.set(scale, 1);
          engine.texture.offset.set((1 - scale) / 2, 0);
        }

        engine.texture.needsUpdate = true;
      }
    }

    // ── Hotspots Logic Removed (Phase 12) ────────────────────────────────────

    // ── Render WebGL ─────────────────────────────────────────────────────────
    engine.composer.render();

    // ── Mouse parallax (desktop only) ─────────────────────────────────────────
    if (!isMobile()) {
      let mx = mouse.current?.x || 0;
      let my = mouse.current?.y || 0;

      if (canvasWrap) {
        canvasWrap.style.transform = `translate(${mx * 16}px, ${my * 10}px) scale(${1 + progress * 0.05})`;
      }
      if (bgGrid) {
        bgGrid.style.transform = `translate(${mx * -8}px, ${my * -5}px)`;
      }
      if (ambient) {
        const ambientProgress = Math.min(1, progress * 2);
        ambient.style.opacity = 0.4 + ambientProgress * 0.6;
        ambient.style.transform = `translate(${mx * 12}px, ${my * 8}px)`;
      }
    } else {
      if (canvasWrap) {
        canvasWrap.style.transform = `scale(${1 + progress * 0.03})`;
      }
    }

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [mouse]);

  // ── GSAP ScrollTrigger setup ───────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Mount: preload frames + start render ──────────────────────────────────
  useEffect(() => {
    const isHighDPI = window.devicePixelRatio >= 1.5;
    const isLargeScreen = window.innerWidth >= 1200;
    const quality = (!isMobile() && (isHighDPI || isLargeScreen)) ? 'hd' : 'mobile';
    
    const paths = buildFramePaths(FRAME_COUNT, quality);
    imagesRef.current = preloadImages(paths, 10, (loaded) => {
      if (loaded >= 1 && imagesRef.current[0]) {
        setFirstFrameReady(true);
      }
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, renderLoop]);

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      style={{ height: '400vh', position: 'relative' }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'clip',
          backgroundColor: '#0B0F14',
        }}
      >
        {/* Layer 0: Background grid */}
        <div
          ref={bgGridRef}
          style={{
            position: 'absolute',
            inset: '-5%',
            width: '110%',
            height: '110%',
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
            zIndex: 0,
            willChange: 'transform',
          }}
        />

        {/* Layer 1: Ambient glow orbs */}
        <div
          ref={ambientRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.4,
            willChange: 'transform, opacity',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '55%',
            height: '55%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'glowPulse 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'glowPulse 8s ease-in-out infinite',
            animationDelay: '3s',
          }} />
        </div>

        {/* Layer 2: WebGL Canvas */}
        <div
          ref={canvasWrapRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              opacity: firstFrameReady ? 1 : 0,
              transition: 'opacity 0.8s ease',
              display: 'block',
              outline: 'none',
            }}
          />
        </div>

        {/* ── Hotspots Layer Removed (Phase 12) ──────────────────────────────── */}

        {/* Layer 3: Floating particles */}
        <ParticleField />

        {/* Layer 4: Edge vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(11,15,20,0.9) 100%)
          `,
          pointerEvents: 'none',
          zIndex: 4,
        }} />
      </div>
    </section>
  );
};

export default ProductAnimation;
