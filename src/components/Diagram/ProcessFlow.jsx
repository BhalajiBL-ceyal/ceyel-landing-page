import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, ShieldAlert, BadgeCheck } from 'lucide-react';

const ProcessFlowDiagram = () => {
  const nodes = [
    { id: '1', title: 'Raw Data', icon: <Server className="w-6 h-6" />, desc: 'Edge ERPs' },
    { id: '2', title: 'Analysis', icon: <Cpu className="w-6 h-6" />, desc: 'Digital Twin' },
    { id: '3', title: 'ZK Proof', icon: <ShieldAlert className="w-6 h-6" />, desc: 'Logic Check' },
    { id: '4', title: 'Verified', icon: <BadgeCheck className="w-6 h-6" />, desc: 'Anchored Truth' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      {/* Container for absolute SVGs and relative nodes */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        
        {/* SVG Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] z-0">
          <svg width="100%" height="24" className="overflow-visible">
            {/* Base line */}
            <line x1="0" y1="12" x2="100%" y2="12" className="stroke-gray-200" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Animated glowing path */}
            <motion.line
              x1="0" y1="12" x2="100%" y2="12"
              className="stroke-blue-500" strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ 
                pathLength: [0, 1, 1],
                opacity: [0.2, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear"
              }}
            />
          </svg>
        </div>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div 
            key={node.id}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center relative z-10 w-44"
          >
            {/* Node Circle */}
            <div className="w-32 h-32 rounded-[2rem] bg-white shadow-md border border-gray-100 flex flex-col items-center justify-center mb-4 text-blue-600 transition-colors hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10">
              {node.icon}
            </div>
            
            {/* Pulse Ring (simulating processing) */}
            {index === 1 && (
              <motion.div 
                className="absolute top-0 w-32 h-32 rounded-[2rem] border border-blue-400"
                animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            <h3 className="text-xl font-bold text-gray-900 tracking-tight text-center">{node.title}</h3>
            <p className="text-sm font-medium text-gray-500 text-center uppercase tracking-widest mt-1">{node.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlowDiagram;
