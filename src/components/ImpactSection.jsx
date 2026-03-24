import React from 'react';
import { motion } from 'framer-motion';

const ImpactSection = () => {
  const metrics = [
    { value: '5-15%', label: 'Cost Reduction', desc: 'Via autonomous SLA tracking and error reduction.' },
    { value: '60-80%', label: 'Audit Cost Reduction', desc: 'Through instant, cryptographically verified record access.' },
    { value: '10-20%', label: 'SLA Improvement', desc: 'By detecting process deviations before they compound.' },
    { value: '80%', label: 'Risk Reduction', desc: 'Minimizing compliance and regulatory exposure.' }
  ];

  return (
    <section className="w-full py-[120px] bg-gray-900 text-white border-y border-gray-900">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            Measured Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-400 font-medium"
          >
            Quantifiable advantages of an immutable operational backbone.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center text-center"
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
                {m.value}
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase tracking-wide">{m.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
