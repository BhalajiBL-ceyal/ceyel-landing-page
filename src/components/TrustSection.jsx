import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  return (
    <section className="w-full py-[120px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 w-full text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-4 bg-gray-100 rounded-full inline-flex items-center justify-center border border-gray-200"
        >
          <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase px-4">Verification Layer</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-12"
          style={{ letterSpacing: '-0.04em' }}
        >
          Don't Trust the System. <br/>
          <span className="text-blue-600">Verify It.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-left mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Merkle Proofs</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Every data ingest is cryptographically hashed. Reconstruct process flow history with absolute mathematical certainty.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 border-y md:border-y-0 md:border-x border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Immutable Records</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              State transitions are anchored to decentralized ledgers, freezing operational history so it can never be quietly altered.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Verification</h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              Allow external auditors to independently verify SLA adherence and compliance checks without touching your core databases.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
