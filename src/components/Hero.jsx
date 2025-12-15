import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>
      
      {/* Navbar (Absolute) */}
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-widest text-primaryText">CEYEL</div>
        <button className="text-sm font-medium text-secondaryText hover:text-white transition-colors">
          Get in Touch
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        
        {/* Brand Name / Intro */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-accent text-sm md:text-base font-semibold tracking-[0.2em] uppercase"
        >
          CEYEL &mdash; Process Intelligence
        </motion.span>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Process Intelligence for the <br className="hidden md:block" />
          <span className="text-white">Next Era of Operations</span>
        </motion.h1>

        {/* Subline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-secondaryText max-w-2xl leading-relaxed"
        >
          See systems. Understand flow. Act with clarity.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-4"
        >
          <button className="group relative px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-sm flex items-center gap-2 overflow-hidden">
            <span>Explore the Platform</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-accent/50 transition-all duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondaryText/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondaryText/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
