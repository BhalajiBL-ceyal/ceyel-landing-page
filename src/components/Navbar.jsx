import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: '/platform' },
    { name: 'Technology', path: '/technology' },
    { name: 'Whitepaper', path: '/whitepaper' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border-b border-gray-200/50 block' : 'bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-[64px] md:h-[88px] flex items-center justify-between relative">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group z-[1010] mr-5" onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.jpg" alt="Ceyel Logo" className="h-[36px] md:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.path}
                className={`text-[18px] font-semibold tracking-wide transition-colors duration-300 hover:text-[#005bb5] ${location.pathname === link.path ? 'text-[#0071E3]' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden z-[1010]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 p-2 -mr-2 hover:bg-gray-100/50 rounded-lg transition-colors cursor-pointer outline-none tap-highlight-transparent"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dimmed Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[990] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed top-0 right-0 h-[100dvh] w-[280px] bg-white shadow-2xl z-[995] md:hidden flex flex-col pt-24 px-6 border-l border-gray-100 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-[20px] font-semibold tracking-wide transition-colors duration-300 ${location.pathname === link.path ? 'text-[#0071E3]' : 'text-gray-600 hover:text-[#005bb5]'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-8 pt-8">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 text-center block bg-gray-900 text-white font-bold rounded-xl shadow-lg shadow-gray-900/10 hover:bg-black transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
