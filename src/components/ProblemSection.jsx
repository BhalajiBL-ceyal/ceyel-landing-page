import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldOff, FileWarning } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: <Database className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Fragmented Systems',
      description: 'Data exists in silos across legacy ERPs, edge sensors, and cloud CRMs. Disconnected workflows create blind spots.'
    },
    {
      icon: <ShieldOff className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'No Trust in Data',
      description: 'When disputes arise over SLAs or multi-party workflows, there is no cryptographic single source of truth.'
    },
    {
      icon: <FileWarning className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: 'Manual Compliance',
      description: 'Auditing is a vastly slow, retroactive process requiring manual review of logs, rather than autonomous real-time proofs.'
    }
  ];

  return (
    <section className="w-full py-[120px] bg-white flex flex-col items-center justify-center">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Enterprises Don't Lack Data. <br/>
            <span className="text-gray-400">They Lack Truth.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-500 font-medium"
          >
            The modern manufacturing and logistics gap is one of verification, not accumulation.
          </motion.p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {problems.map((prob, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm border border-gray-100">
                {prob.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">{prob.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
