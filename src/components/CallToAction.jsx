import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
        >
          Interested in what <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
            CEYEL is building?
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href="mailto:hello@ceyel.co.in" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-background rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default CallToAction;
