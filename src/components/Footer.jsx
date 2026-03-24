import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-secondaryBg border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-secondaryText font-medium">
        <div className="mb-4 md:mb-0 flex items-center gap-3">
          <img src="/logo.jpg" alt="Ceyel Logo" className="h-8 md:h-10 w-auto object-contain" />
          <span>&copy; {new Date().getFullYear()} Ceyel. All rights reserved.</span>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-primaryText transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primaryText transition-colors">Terms of Service</a>
          <a href="/contact" className="hover:text-primaryText transition-colors">Contact</a>
          <a href="https://www.linkedin.com/in/bhalaji-bl-2aa59a21a/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors ml-4 border-l border-gray-200 pl-4">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
