import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Cpu, ScanSearch, TrendingDown, Target } from 'lucide-react';
import Footer from '../components/Footer';
import FinalCTA from '../components/FinalCTA';
import ProcessFlow from '../components/Diagram/ProcessFlow';
import TwinViewer from '../components/DigitalTwin/TwinViewer';

const PlatformPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full py-[120px] bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100"
      >
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            The Ceyel Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto"
          >
            Operational Intelligence with Built-in Trust.
          </motion.p>
        </div>
      </motion.section>

      {/* Core Capabilities */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full py-[120px] bg-white"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-xl text-gray-500">Autonomous tools for modern manufacturing and logistics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <ScanSearch />, title: "Real-Time Discovery", desc: "Instantly aggregate telemetry from ERPs and edge sensors to reconstruct the exact flow of operations natively." },
              { icon: <Activity />, title: "Deviation Detection", desc: "Spot bottlenecks and protocol breaches the second they occur, rather than discovering them in next week's audit." },
              { icon: <Zap />, title: "Predictive Intelligence", desc: "Forecast impending critical SLA failures by analyzing structural inefficiencies in your active workflows." },
              { icon: <Cpu />, title: "Digital Twin Sandbox", desc: "Run a live, shadow network of your entire operational enterprise to safely test and deploy optimizations." }
            ].map((cap, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-6 p-10 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow duration-300 cursor-default"
              >
                <div className="w-16 h-16 rounded-[18px] bg-blue-50/50 flex items-center justify-center flex-shrink-0 border border-blue-100 text-blue-600">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{cap.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <TwinViewer />
          </div>
        </div>
      </motion.section>

      {/* How It Works (Interactive Flow) */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full py-[120px] bg-gray-50 border-y border-gray-100"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4 text-center">How It Works</h2>
          <p className="text-xl text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            From fragmented raw telemetry to mathematically proven operational output without ever moving your distinct databases.
          </p>
          
          <ProcessFlow />
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full py-[120px] bg-white"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight text-center mb-20">Business Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: "30x", title: "Faster Decisions", desc: "Operate on verified real-time data instead of waiting weeks for retroactive reporting." },
              { val: "-80%", title: "Reduction in Costs", desc: "Eliminate manual compliance checks and SLA dispute settlements." },
              { val: "100%", title: "Automated Compliance", desc: "Programmatic protocol adherence secured by autonomous ZK ledgers." }
            ].map((ben, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03 }}
                className="text-center flex flex-col items-center p-12 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-default"
              >
                <div className="text-5xl md:text-7xl font-bold text-blue-600 tracking-tighter mb-6 relative">
                  {ben.val}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{ben.title}</h3>
                <p className="text-gray-500 leading-relaxed">{ben.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default PlatformPage;
