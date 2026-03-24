import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Truck, Activity, Landmark } from 'lucide-react';

const UseCasesSection = () => {
  const cases = [
    { icon: <Factory strokeWidth={1.5} />, title: 'Manufacturing', desc: 'Securely track precision part tolerances and robotic arm SLAs across third-party suppliers using immutable zero-knowledge checks.' },
    { icon: <Truck strokeWidth={1.5} />, title: 'Supply Chain & Logistics', desc: 'Settle shipment disputes instantly via GPS and IoT telemetry backed by decentralized anchor proofs.' },
    { icon: <Activity strokeWidth={1.5} />, title: 'Healthcare', desc: 'Audit privacy-compliant patient data flows and pharmaceutical cold-chain temperatures autonomously.' },
    { icon: <Landmark strokeWidth={1.5} />, title: 'Finance', desc: 'Ensure multi-party transaction histories and high-frequency trading latency SLAs are cryptographically indisputable.' }
  ];

  return (
    <section className="w-full py-[120px] bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-primaryText mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Built for Critical Infrastructure
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {cases.map((uc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-3xl bg-white border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondaryBg flex items-center justify-center flex-shrink-0 text-accent">
                {uc.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primaryText mb-3">{uc.title}</h3>
                <p className="text-secondaryText leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UseCasesSection;
