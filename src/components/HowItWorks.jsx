import React from 'react';
import { motion } from 'framer-motion';

const FlowNode = ({ title, delay, isLast }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center gap-4 relative z-10 w-full md:w-auto"
  >
    <div className="w-16 h-16 rounded-2xl bg-surface border border-divider flex items-center justify-center shadow-2xl relative group">
      <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-md group-hover:bg-accent/10 transition-colors" />
      <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
    </div>
    <span className="text-sm font-medium text-secondaryText uppercase tracking-wider text-center">{title}</span>
    
    {!isLast && (
      <div className="md:hidden w-[1px] h-12 bg-divider" />
    )}
  </motion.div>
);

const HowItWorks = () => {
  const steps = [
    "Raw Data",
    "Event Intelligence",
    "Pattern Discovery",
    "Predictive Understanding",
    "Actionable Decisions"
  ];

  return (
    <section className="py-24 bg-background relative border-t border-divider/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">From Chaos to Clarity</h2>
        </motion.div>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Horizontal Line for Desktop */}
          <div className="absolute top-[2rem] left-0 w-full h-[1px] bg-divider hidden md:block -z-0" />
          
          {/* Moving Pulse for Desktop */}
          <motion.div 
            initial={{ left: "0%" }}
            whileInView={{ left: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-[2rem] h-[1px] w-20 bg-gradient-to-r from-transparent via-accent to-transparent hidden md:block -z-0"
          />

          {steps.map((step, index) => (
            <FlowNode 
              key={index} 
              title={step} 
              delay={index * 0.2} 
              isLast={index === steps.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
