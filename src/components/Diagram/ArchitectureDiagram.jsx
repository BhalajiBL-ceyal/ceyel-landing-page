import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Activity, ShieldCheck, LinkIcon, ChevronRight } from 'lucide-react';

const ArchitectureStack = () => {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    {
      id: "l4",
      icon: <LinkIcon className="text-blue-500" />,
      title: "Layer 4: Immutable Ledger",
      subtitle: "EVM-Compatible Anchoring",
      desc: "Mathematical proofs of your operational integrity are anchored to Ethereum and Polygon via L2 rollups, establishing an immutable timestamp that auditors can query instantly with near-zero gas overhead.",
      bullets: ["Sub-second finality", "Public verifiability", "Tamper-proof log"],
      color: "bg-blue-50/50",
      borderColor: "border-blue-100"
    },
    {
      id: "l3",
      icon: <ShieldCheck className="text-indigo-500" />,
      title: "Layer 3: Trust & Cryptography",
      subtitle: "Zero-Knowledge Circuitry",
      desc: "Cross-party protocols are executed natively within ZK-SNARK circuits. Output a binary validity token identifying whether SLAs were met without ever exposing the proprietary telemetry to external vendors.",
      bullets: ["AES-256 Encryption", "Data firewalls", "Client-side proving"],
      color: "bg-indigo-50/50",
      borderColor: "border-indigo-100"
    },
    {
      id: "l2",
      icon: <Activity className="text-violet-500" />,
      title: "Layer 2: Intelligence Engine",
      subtitle: "Predictive Digital Twins",
      desc: "Heuristic process mining rapidly models your operational graph. Predict structural deviations and SLA failures up to 72 hours before they manifest physically in your logistics pipeline.",
      bullets: ["Parallel simulation", "Anomaly detection", "Root cause diagnosis"],
      color: "bg-violet-50/50",
      borderColor: "border-violet-100"
    },
    {
      id: "l1",
      icon: <Database className="text-gray-500" />,
      title: "Layer 1: Data Ingestion",
      subtitle: "Native Edge Connectivity",
      desc: "Aggregates massive volumes of fragmented payload telemetry via MQTT and native ERP APIs, standardizing disparate schemas into a singular intelligence fabric.",
      bullets: ["Native SAP/Oracle hooks", "IoT edge streaming", "Schema normalization"],
      color: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 relative">
      {layers.map((layer) => {
        const isActive = activeLayer === layer.id;
        
        return (
          <motion.div
            key={layer.id}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
            layout
            initial={{ borderRadius: 24 }}
            className={`w-full relative overflow-hidden cursor-pointer border ${layer.borderColor} bg-white transition-shadow duration-300 ${isActive ? 'shadow-xl' : 'shadow-sm'}`}
          >
            {/* Background highlight pill */}
            <motion.div
              layout
              className={`absolute inset-0 ${layer.color} opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}
            />
            
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{layer.title}</h3>
                  <p className="text-gray-500 font-medium text-sm mt-1">{layer.subtitle}</p>
                </div>
              </div>
              
              <div className={`transition-transform duration-300 hidden md:block ${isActive ? 'rotate-90 text-blue-600' : 'text-gray-300'}`}>
                <ChevronRight />
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="relative px-6 md:px-8 pb-8 z-10 -mt-2"
                >
                  <div className="pt-4 border-t border-gray-100 mb-6" />
                  <p className="text-gray-600 leading-relaxed mb-6">{layer.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {layer.bullets.map((b, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-bold uppercase rounded-md tracking-wide">
                        {b}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
};

export default ArchitectureStack;
