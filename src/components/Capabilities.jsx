import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Activity, 
  BarChart3, 
  Zap, 
  GitBranch, 
  Cpu, 
  Layers 
} from 'lucide-react';

const CapabilityCard = ({ title, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group p-6 rounded-2xl bg-surface border border-divider hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 flex flex-col gap-4 cursor-default"
  >
    <div className="w-10 h-10 rounded-lg bg-background border border-divider flex items-center justify-center group-hover:border-accent/50 group-hover:text-accent transition-colors">
      <Icon className="w-5 h-5 text-secondaryText group-hover:text-accent transition-colors" />
    </div>
    <h3 className="text-lg font-semibold text-primaryText group-hover:text-white transition-colors">{title}</h3>
  </motion.div>
);

const Capabilities = () => {
  const capabilities = [
    { title: "Process Discovery", icon: Search },
    { title: "Bottleneck Detection", icon: Activity },
    { title: "Performance Insights", icon: BarChart3 },
    { title: "Predictive Analysis", icon: Zap },
    { title: "Scenario Simulation", icon: GitBranch },
    { title: "Digital Twin–Ready", icon: Cpu },
    { title: "Decision Support", icon: Layers },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 p-6 flex items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
              <p className="text-secondaryText text-sm">
                Engineered for total operational awareness.
              </p>
            </div>
          </div>
          
          {capabilities.map((cap, index) => (
            <CapabilityCard 
              key={index} 
              title={cap.title} 
              icon={cap.icon} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
