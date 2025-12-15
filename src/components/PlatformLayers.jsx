import React from 'react';
import { motion } from 'framer-motion';

const layers = [
  {
    title: "Data Layer",
    description: "Ingests raw operational data from any source.",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
  },
  {
    title: "Intelligence Layer",
    description: "Structures chaotic events into coherent flows.",
    color: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/30",
  },
  {
    title: "Analysis Layer",
    description: "Identifies bottlenecks, loops, and deviations instantly.",
    color: "from-purple-500/20 to-fuchsia-500/20",
    border: "border-purple-500/30",
  },
  {
    title: "Simulation Layer",
    description: "Tests 'what-if' scenarios before real-world implementation.",
    color: "from-fuchsia-500/20 to-pink-500/20",
    border: "border-fuchsia-500/30",
  },
  {
    title: "Decision Layer",
    description: "Recommends actionable interventions with predicted impact.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
  {
    title: "Visualization Layer",
    description: "Presents complex systems as intuitive, interactive maps.",
    color: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-500/30",
  },
];

const LayerCard = ({ layer, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`relative w-full max-w-4xl mx-auto mb-6 p-8 rounded-2xl border ${layer.border} bg-gradient-to-br ${layer.color} backdrop-blur-xl overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-surface/80 group-hover:bg-surface/70 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{layer.title}</h3>
          <p className="text-secondaryText text-sm md:text-base max-w-xl">{layer.description}</p>
        </div>
        <div className="hidden md:block w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 text-xs font-mono">
          0{index + 1}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
    </motion.div>
  );
};

const PlatformLayers = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          The Intelligence Stack
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-secondaryText"
        >
          Built to understand depth.
        </motion.p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {layers.map((layer, index) => (
          <LayerCard key={index} layer={layer} index={index} />
        ))}
      </div>
      
      {/* Connecting Line */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-accent/20 to-transparent -z-10"
      />
    </section>
  );
};

export default PlatformLayers;
