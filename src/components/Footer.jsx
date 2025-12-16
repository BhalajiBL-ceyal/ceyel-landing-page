import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-secondaryText">
          &copy; 2025 CEYEL. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/bhalaji-bl-2aa59a21a/" className="text-secondaryText hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/BhalajiBL-ceyal" className="text-secondaryText hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:ceyeltech@gmail.com" className="text-secondaryText hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
