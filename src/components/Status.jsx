import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const Status = () => {
  return (
    <section className="py-20 px-6 bg-surface border-y border-divider">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <motion.div 
          initial={{ rotate: -10, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="p-4 rounded-full bg-background border border-divider"
        >
          <Construction className="w-6 h-6 text-accent" />
        </motion.div>
        
        <div className="space-y-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-white"
          >
            CEYEL is currently in MVP development
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondaryText"
          >
            Focused on real-world validation. Open to early pilots and collaborations.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Status;
