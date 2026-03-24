import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Hexagon, Network, ActivitySquare, Cpu } from 'lucide-react';
import Footer from '../components/Footer';
import FinalCTA from '../components/FinalCTA';
import ArchitectureDiagram from '../components/Diagram/ArchitectureDiagram';
import TrustFlow from '../components/Diagram/TrustFlow';

const TechnologyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full py-[120px] bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[200px] opacity-10 pointer-events-none" />
        <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-gray-700 bg-gray-800/80 backdrop-blur text-sm font-semibold tracking-wide text-gray-300 uppercase shadow-lg"
          >
            <Hexagon className="w-4 h-4 text-blue-400" /> Engineering Core
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            Technology Behind Ceyel
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-xl text-gray-400 font-medium max-w-2xl mx-auto"
          >
             A vertically integrated stack converting opaque mechanical data into cryptographically verified network outputs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full mt-12 mx-auto"
          >
            {/* 3D Visual removed; shifted entirely to Platform Sandbox */}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full py-[120px] bg-gray-50"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-[160px]">
          
          {/* Interactive Stack */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">4-Layer Architecture Stack</h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                Ceyel abstracts the extreme complexity of process mining and cryptographic bridging into a single unified topology. Hover over the layers to inspect internal sub-protocols.
              </p>
            </div>
            <div className="flex-1 w-full">
               <ArchitectureDiagram />
            </div>
          </div>

          {/* Intelligence Engine - Rebuilt as interactive Grid */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 font-bold tracking-tight mb-4">Intelligence Engine</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">Operating at the intersection of heuristic discovery and parallel processing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Network />, title: "Heuristic Graphing", desc: "Dynamically constructs a 3D matrix of your enterprise logic routing." },
                { icon: <ActivitySquare />, title: "Predictive Triggers", desc: "Fires localized vector warnings based on identified structural pipeline divergence." },
                { icon: <Cpu />, title: "Parallel Computations", desc: "Capable of analyzing 50,000+ payload events per second natively." }
              ].map((pt, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="flex flex-col gap-4 p-10 bg-white shadow-sm border border-gray-100 rounded-[32px] hover:shadow-xl hover:border-blue-100 transition-all"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    {pt.icon}
                  </div>
                  <span className="text-gray-900 font-bold text-2xl tracking-tight">{pt.title}</span>
                  <p className="text-gray-500 leading-relaxed">{pt.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verification Diagram injection */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 font-bold tracking-tight mb-4">Trust & Validation Routine</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">Zero-Knowledge Rollup translation pipeline.</p>
            </div>
            <TrustFlow />
          </div>

        </div>
      </motion.section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default TechnologyPage;
