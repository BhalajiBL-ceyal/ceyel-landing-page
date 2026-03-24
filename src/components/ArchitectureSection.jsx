import React from 'react';
import { motion } from 'framer-motion';

const ArchitectureSection = () => {
  const blocks = [
    {
      step: '01',
      title: 'Data Ingestion',
      subtitle: 'ERP, CRM, IoT Edge Sensors',
      desc: 'Connects to your existing fragmented systems to pull real-time operational streams without heavy lifting.',
      color: 'bg-gray-100',
    },
    {
      step: '02',
      title: 'Intelligence Engine',
      subtitle: 'Digital Twin & Modeling',
      desc: 'Builds a unified operational twin, running predictive models to discover deviations before they happen.',
      color: 'bg-white',
    },
    {
      step: '03',
      title: 'Trust & Compliance Layer',
      subtitle: 'ZK Proofs & SLA Automation',
      desc: 'Evaluates workflow states cryptographically, proving compliance without exposing raw data to third parties.',
      color: 'bg-gray-100',
    },
    {
      step: '04',
      title: 'Blockchain Layer',
      subtitle: 'Immutable Ledger Anchors',
      desc: 'Anchors state proofs directly onto decentralized ledgers for mathematically irrefutable audit trails.',
      color: 'bg-blue-50',
    }
  ];

  return (
    <section className="w-full py-[120px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 w-full text-left">
        
        {/* Header */}
        <div className="mb-24 px-4 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Built as a Layered <br/>Intelligence System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-500 font-medium"
          >
            A vertical stack engineered to turn raw data into verified truth.
          </motion.p>
        </div>

        {/* Vertical Flow Diagram */}
        <div className="relative flex flex-col gap-12 max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gray-200" />
          
          {blocks.map((block, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 rounded-[2rem] border border-gray-100 ${block.color} shadow-sm transition-transform hover:-translate-y-1`}
            >
              <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center font-bold text-2xl md:text-4xl text-gray-300 mr-8 mb-6 md:mb-0">
                {block.step}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{block.title}</h3>
                <h4 className="text-blue-600 font-semibold tracking-wide text-sm mb-4 uppercase">{block.subtitle}</h4>
                <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                  {block.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArchitectureSection;
