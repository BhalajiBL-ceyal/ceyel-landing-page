import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="w-full py-[120px] bg-white">
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8"
          style={{ letterSpacing: '-0.04em' }}
        >
          Build Trust Into Your Operations.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto"
        >
          Join leading enterprises migrating from reactive audits to autonomous cryptographic verification.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-full font-semibold text-xl transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20 cursor-pointer text-center block">
            Request Demo
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
