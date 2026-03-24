import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StaticHero = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden pt-[140px] pb-[120px]">
      
      {/* Apple style ambient blur background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gray-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gray-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Subtitle / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-10 px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md shadow-sm"
        >
          <span className="text-gray-500 text-sm font-medium tracking-wide uppercase">Introducing Ceyel Intelligence Layer</span>
        </motion.div>

        {/* Main Headline (Bold, Hierarchy Fixed) */}
        <motion.h1 
          className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
        >
          Process Intelligence.
          <br/>
          <span className="text-gray-400 mt-2 block" style={{ letterSpacing: '-0.03em' }}>With Trust.</span>
        </motion.h1>

        {/* Subtext (Accurate 32px gap below heading) */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-500 font-medium mb-10 w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ lineHeight: 1.4 }}
        >
          Real-time insights. Cryptographic proof. Autonomous compliance.
        </motion.p>

        {/* Button Row (Horizontal, 24px gap) */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Primary Solid Dark Button */}
          <Link to="/platform" className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors shadow-lg shadow-black/10 cursor-pointer text-center block">
            Explore Platform
          </Link>
          
          {/* Secondary Text Link with Arrow */}
          <Link to="/whitepaper" className="px-6 py-4 bg-transparent text-gray-900 flex items-center gap-2 rounded-full font-semibold text-lg hover:text-blue-600 transition-colors group cursor-pointer inline-flex">
            Read Whitepaper
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default StaticHero;
