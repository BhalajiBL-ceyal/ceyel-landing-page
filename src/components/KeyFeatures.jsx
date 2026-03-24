import React from 'react';
import { motion } from 'framer-motion';
import { Eye, AlertTriangle, Lightbulb, Box, Settings, ShieldCheck } from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    { icon: <Eye strokeWidth={1.5} />, title: 'Real-Time Process Discovery', desc: 'Map workflows invisibly as they happen without manual process mining.' },
    { icon: <AlertTriangle strokeWidth={1.5} />, title: 'Deviation Detection', desc: 'Instantly flag anomalous pathways before they compound into systemic gaps.' },
    { icon: <Lightbulb strokeWidth={1.5} />, title: 'Predictive Intelligence', desc: 'Forecast bottlenecks and throughput delays via built-in analytical modeling.' },
    { icon: <Box strokeWidth={1.5} />, title: 'Digital Twin Simulation', desc: 'Test hypothetical operational changes in a safe, parallel sandbox environment.' },
    { icon: <Settings strokeWidth={1.5} />, title: 'SLA Automation', desc: 'Trigger complex multi-party smart-contracts instantly when thresholds are met.' },
    { icon: <ShieldCheck strokeWidth={1.5} />, title: 'Cryptographic Proofs', desc: 'Generate ZK-proofs that verify compliance without ever leaking raw metrics.' }
  ];

  return (
    <section className="w-full py-[120px] bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Capabilities that scale.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 transition-shadow"
            >
              <div className="text-blue-600 mb-6 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
