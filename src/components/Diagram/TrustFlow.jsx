import React from 'react';
import { motion } from 'framer-motion';
import { Database, Binary, Key, Link as LinkIcon } from 'lucide-react';

const TrustValidationDiagram = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 rounded-[2rem] border border-gray-800 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Step 1: Data */}
        <div className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
          <Database className="w-10 h-10 text-gray-400 mb-6" />
          <h3 className="text-xl font-bold mb-2 text-center">Proprietary Cargo Temperature: 4°C</h3>
          <p className="text-sm text-gray-400 text-center">Remains local. Never leaves your hardware.</p>
        </div>

        {/* The Animated Hash Flow */}
        <div className="hidden md:flex flex-col justify-center items-center relative h-full min-h-[160px]">
          <Binary className="w-8 h-8 text-blue-500 mb-4 z-10 bg-gray-900" />
          
          <div className="absolute w-full h-[2px] bg-gray-800 top-1/2 -translate-y-1/2 -z-0">
            <motion.div
              className="h-full bg-blue-500 w-1/3 blur-[2px]"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="mt-4 text-[10px] font-mono text-blue-400 break-all w-full text-center tracking-widest">
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }}>
              0xC4b89A..f1
            </motion.span>
          </div>
        </div>

        {/* Step 2: Proof & Ledger */}
        <div className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:border-blue-500/50 transition-colors relative overflow-hidden group">
          <motion.div
            className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Key className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-center">Binary ZK Proof Generated</h3>
          <p className="text-sm text-gray-400 text-center flex items-center justify-center gap-2">
            <LinkIcon className="w-4 h-4" /> Anchored to L2 Ledger
          </p>
        </div>

      </div>
    </div>
  );
};

export default TrustValidationDiagram;
