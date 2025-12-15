import React from 'react';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import PlatformLayers from './components/PlatformLayers';
import HowItWorks from './components/HowItWorks';
import Capabilities from './components/Capabilities';
import FounderNarrative from './components/FounderNarrative';
import Status from './components/Status';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-background text-primaryText selection:bg-accent selection:text-white overflow-x-hidden">
      <Hero />
      <Philosophy />
      <PlatformLayers />
      <HowItWorks />
      <Capabilities />
      <FounderNarrative />
      <Status />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
