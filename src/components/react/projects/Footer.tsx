
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  // Add props if needed in future
}

export const Footer: React.FC<FooterProps> = () => (
  <footer className="mt-32 pt-24 border-t border-gray-100 dark:border-gray-800 text-center">
    <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">
      Let's_Architect_Something_New_
    </h3>
    <button 
      onClick={() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }}
      className="px-10 py-5 bg-accent text-black font-black uppercase text-sm inline-flex items-center gap-4 transition-all hover:scale-105"
    >
      INITIATE_CONTACT <ArrowRight size={18} />
    </button>
  </footer>
);
