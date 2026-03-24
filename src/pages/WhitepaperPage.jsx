import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Activity, Map, Lock, Zap, LinkIcon, ShieldCheck, TrendingDown, Clock, ShieldAlert, Cpu } from 'lucide-react';
import Footer from '../components/Footer';
import ArchitectureDiagram from '../components/Diagram/ArchitectureDiagram';
import ProcessFlow from '../components/Diagram/ProcessFlow';
import TrustFlow from '../components/Diagram/TrustFlow';

const WhitepaperPage = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When a section comes into the upper middle view, mark it highly visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 });

    const sectionsIds = [
      'executive-summary', 'industry-challenges', 'system-architecture',
      'intelligence-engine', 'trust-compliance', 'blockchain-design',
      'security-privacy', 'business-value', 'roadmap',
      'competitive-advantage', 'conclusion'
    ];

    sectionsIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary' },
    { id: 'industry-challenges', title: 'Industry Challenges' },
    { id: 'system-architecture', title: 'System Architecture' },
    { id: 'intelligence-engine', title: 'Intelligence Engine' },
    { id: 'trust-compliance', title: 'Trust & Compliance Layer' },
    { id: 'blockchain-design', title: 'Blockchain Design' },
    { id: 'security-privacy', title: 'Security & Privacy' },
    { id: 'business-value', title: 'Business Value & ROI' },
    { id: 'roadmap', title: 'Roadmap' },
    { id: 'competitive-advantage', title: 'Competitive Advantage' },
    { id: 'conclusion', title: 'Conclusion' }
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 pt-24">
      
      {/* Hero Header */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-gray-50 border-b border-gray-100 py-[80px] md:py-[120px]"
      >
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6"
            style={{ letterSpacing: '-0.04em' }}
          >
            Ceyel Whitepaper
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
          >
            Process Intelligence with Cryptographic Trust.
          </motion.p>
        </div>
      </motion.header>

      {/* Main Documentation Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-[80px] flex flex-col lg:flex-row gap-16 relative items-start">
        
        {/* Mobile Dropdown Index */}
        <div className="block lg:hidden w-full sticky top-20 z-40 bg-white shadow-sm border-b border-gray-200 -mx-6 px-6 pb-4 pt-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2 block mb-2">Jump to Section</label>
          <select 
            value={activeSection}
            onChange={(e) => scrollTo(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {sections.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>

        {/* Sticky Desktop Sidebar */}
        <aside className="hidden lg:block w-1/4 sticky top-32 transition-all shrink-0">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contents</h4>
          <nav className="flex flex-col gap-3">
            {sections.map(sec => (
              <button 
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`text-left text-sm font-medium transition-all ${activeSection === sec.id ? 'text-blue-600 font-bold border-l-2 border-blue-600 pl-3' : 'text-gray-500 hover:text-gray-900 pl-3 border-l-2 border-transparent hover:border-gray-200'}`}
              >
                {sec.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Body Matrix */}
        <motion.main 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/4 flex flex-col gap-[120px] pb-32"
        >

          <section id="executive-summary" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Executive Summary</h2>
            <div className="prose text-gray-600 max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Modern enterprise logistics suffer from a deep validation paradox: billions are spent accumulating operational telemetry, yet extracting <strong className="text-gray-900">verifiable truth</strong> from cross-party workflows remains highly subjective.
              </p>
              <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
                <h4 className="text-blue-900 font-bold mb-2">Core Hypothesis</h4>
                <p className="text-blue-800 m-0">
                  By marrying structural Process Intelligence (to discover what is happening) with Zero-Knowledge Cryptography (to prove it is happening accurately), Ceyel transforms raw fragmentation into autonomous, undisputed truth.
                </p>
              </div>
            </div>
          </section>

          <section id="industry-challenges" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Industry Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Silotification", desc: "Data is trapped across obsolete ERPs and distinct vendor edges, destroying visibility." },
                { title: "Subjective SLAs", desc: "Multi-party compliance is enforced via backwards-looking self-reporting, causing endless auditing disputes." },
                { title: "Retroactive Paralyzation", desc: "Audits are reactive. Discovering a compliance breach after a month destroys actionable ROI." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-gray-200 rounded-3xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="system-architecture" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">System Architecture</h2>
            <div className="mb-8">
              <ArchitectureDiagram />
            </div>
          </section>

          <section id="intelligence-engine" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Intelligence Engine</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The internal engine represents a generational leap in <strong className="text-gray-900">Predictive Process Mining</strong>. By abstracting events into multidimensional vectors, the Ceyel engine can predict structural deviations up to 72 hours before a physical SLA failure manifests.
            </p>
            <div className="mb-8 p-6 bg-gray-50 border border-gray-100 rounded-3xl">
              <ProcessFlow />
            </div>
          </section>

          <section id="trust-compliance" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Trust & Compliance Layer</h2>
             <div className="p-8 border border-gray-200 rounded-3xl bg-white mb-8">
                <ShieldAlert className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">ZK-Rollup Architecture</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Using zk-SNARK protocols, Ceyel verifies that cross-party logic is flawlessly true, creating a binary proof token. This token reveals <strong className="text-gray-900 text-base">absolutely no proprietary telemetry</strong>, preventing data leakage while proving absolute compliance to auditors.
                </p>
             </div>
             <TrustFlow />
          </section>

          <section id="blockchain-design" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Blockchain Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl">
                <LinkIcon className="text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">L2 Scaling Solutions</h4>
                <p className="text-sm text-gray-500">We deploy payload anchors via Polygon and Arbitrum layers, guaranteeing sub-second proof issuance at near-zero gas rates.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl">
                <Database className="text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Merkle Roots</h4>
                <p className="text-sm text-gray-500">Proofs are batched in chronological Merkle trees natively securing billions of events within microscopic cryptographic footprints.</p>
              </div>
            </div>
          </section>

          <section id="security-privacy" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Security & Privacy</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Zero compromises on proprietary data integrity. Telemetry never leaves your local or private-cloud data lakes without rigorous cryptographic hashing.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-gray-600 mb-6">
               <li>SOC2 Type II equivalent logic frameworks natively embedded.</li>
               <li>End-to-End Encryption (AES-256) on all REST transport payloads.</li>
               <li>Client-Side Proving arrays that compute proofs entirely locally without offloading database payloads.</li>
            </ul>
          </section>

          <section id="business-value" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Business Value & ROI</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { val: "60-80%", text: "Reduction in Audit Costs" },
                   { val: "10-20%", text: "Better SLA Compliance" },
                   { val: "Zero", text: "Proprietary Data Leaks" },
                   { val: "< 1s", text: "Dispute Resolution Time" }
                 ].map((metric, i) => (
                   <div key={i} className="p-6 bg-white border border-gray-200 rounded-3xl text-center">
                     <div className="text-3xl font-bold text-gray-900 mb-2">{metric.val}</div>
                     <div className="text-xs font-bold text-gray-400 uppercase">{metric.text}</div>
                   </div>
                 ))}
              </div>
          </section>

          <section id="roadmap" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Roadmap</h2>
            <div className="flex flex-col gap-8">
               {[
                 { phase: "Phase 1 : Genesis", metrics: "Pilot implementations in Tier-1 logistics networks. Polygon L2 anchoring." },
                 { phase: "Phase 2 : Ascend", metrics: "Automated Smart-Contract SLA Dispute settlements. Custom ZK Prover circuits." },
                 { phase: "Phase 3 : Omnipresence", metrics: "Fully autonomous B2B vendor ecosystems operating mutually trustless protocols natively." }
               ].map((rd, i) => (
                 <div key={i} className="flex gap-4 items-start">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs shrink-0 text-gray-900 font-mono">
                     V{i+1}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900 text-lg mb-1">{rd.phase}</h4>
                     <p className="text-gray-500">{rd.metrics}</p>
                   </div>
                 </div>
               ))}
            </div>
          </section>

          <section id="competitive-advantage" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Competitive Advantage</h2>
            <div className="p-8 border border-blue-200 bg-blue-50/50 rounded-3xl">
               <p className="text-gray-700 leading-relaxed m-0 text-lg">
                 Traditional process mining tools like Celonis offer descriptive visibility but lack absolute cryptographic proofs, yielding to dispute. <strong className="text-blue-700">Ceyel is the only platform actively proving multi-dimensional state transitions natively to decentralized chains</strong>, establishing itself entirely in a category of one.
               </p>
            </div>
          </section>

          <section id="conclusion" className="scroll-mt-32">
             <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Conclusion</h2>
             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               We stand at an inflection point regarding how multi-party networks interact. Ceyel delivers the definitive mathematical baseline required to securely automate global modern supply chains and compliance structures.
             </p>
             <Link to="/platform" className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-colors shadow-lg cursor-pointer">
               Return to Platform
             </Link>
          </section>

        </motion.main>
      </div>

      <Footer />
    </div>
  );
};

export default WhitepaperPage;
