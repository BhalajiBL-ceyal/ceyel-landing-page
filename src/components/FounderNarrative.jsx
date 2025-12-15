import React from 'react';
import { motion } from 'framer-motion';

const FounderNarrative = () => {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent text-sm font-semibold tracking-widest uppercase mb-8 block"
        >
          Why CEYEL Exists
        </motion.span>
        
        <div className="space-y-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl leading-relaxed text-secondaryText"
          >
            "Ceyel started with a simple observation: <br />
            <span className="text-white">complex systems generate data, but clarity is rare.</span>"
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-secondaryText"
          >
            Most decisions remain reactive. <br />
            We believe intelligence should be <span className="text-white">proactive, explainable, and actionable.</span>
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl leading-relaxed text-secondaryText"
          >
            Ceyel is being built to understand processes the way humans do — 
            but at <span className="text-white">system scale.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <p className="text-2xl md:text-3xl font-medium text-white">
              This is not about dashboards. <br />
              It’s about better decisions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default FounderNarrative;
