import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import TechnologyPage from './pages/TechnologyPage';
import WhitepaperPage from './pages/WhitepaperPage';
import ContactPage from './pages/ContactPage';
import { useLenis } from './lib/useLenis';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  // Initialize smooth scroll globally
  useLenis();

  return (
    <Router>
      <CustomCursor />
      {!bootComplete && <Preloader onComplete={() => setBootComplete(true)} />}

      <div style={{ opacity: bootComplete ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
