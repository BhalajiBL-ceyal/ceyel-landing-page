import React from 'react';
import StaticHero from '../components/StaticHero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import ProductAnimation from '../components/ProductAnimation';
import ArchitectureSection from '../components/ArchitectureSection';
import KeyFeatures from '../components/KeyFeatures';
import TrustSection from '../components/TrustSection';
import ImpactSection from '../components/ImpactSection';
import UseCasesSection from '../components/UseCasesSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 selection:bg-blue-600/20 selection:text-gray-900">
      <StaticHero />
      <ProblemSection />
      <SolutionSection />
      
      {/* Dark container for WebGL Pre-rendered frames */}
      <div className="bg-black text-white w-full my-[120px]">
        <ProductAnimation />
      </div>

      <ArchitectureSection />
      <KeyFeatures />
      <TrustSection />
      <ImpactSection />
      <UseCasesSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default HomePage;
