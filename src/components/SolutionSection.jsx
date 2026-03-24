import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Lock, Link as LinkIcon } from 'lucide-react';

const SolutionSection = () => {
  const pillars = [
    {
      icon: <Cpu className="w-10 h-10 text-accent" strokeWidth={1.5} />,
      title: 'Intelligence Engine',
      description: 'Ingests telemetry from edge devices and enterprise architectures to build real-time digital twins of your processes.'
    },
    {
      icon: <Lock className="w-10 h-10 text-accent" strokeWidth={1.5} />,
      title: 'Trust Layer',
      description: 'Generates zero-knowledge proofs and evaluates autonomous SLA rules without exposing raw proprietary data.'
    },
    {
      icon: <LinkIcon className="w-10 h-10 text-accent" strokeWidth={1.5} />,
      title: 'Blockchain Anchoring',
      description: 'Publishes lightweight capability state transitions to decentralized ledgers, freezing truth immutably in time.'
    }
  ];

  return (
    <section className="w-full py-[120px] bg-gray-50 flex flex-col items-center justify-center border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            A New Layer for <br/>
            Process Intelligence
          </motion.h2>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center text-center p-12 ${
                idx !== pillars.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''
              }`}
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-8">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">{pillar.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
