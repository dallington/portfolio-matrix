import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { mode } from '../../store';
import type { Lab } from '../../types';

interface LabCardProps {
  lab: Lab;
}

export const LabCard = ({ lab }: LabCardProps) => {
  const currentMode = useStore(mode);
  const isDev = currentMode === 'dev';

  return (
    <motion.a 
      href={`/labs/${lab.id}`}
      whileHover={{ y: -5 }}
      className={`group cursor-pointer p-8 border flex flex-col justify-between transition-all h-full ${
        isDev 
          ? 'bg-black border-gray-800 hover:border-[var(--accent)]' 
          : 'bg-white border-gray-100 shadow-sm hover:shadow-xl dark:bg-[#121212] dark:border-[#222]'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
           <div className={`p-3 rounded ${isDev ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/10 dark:text-blue-400'}`}>
             <FlaskConical size={20} />
           </div>
           <span className={`text-[10px] font-black uppercase mono tracking-widest ${isDev ? 'text-gray-500' : 'text-gray-400'}`}>
             {lab.type}
           </span>
        </div>
        <h3 className={`text-2xl font-black mb-4 ${isDev ? 'mono uppercase group-hover:text-[var(--accent)]' : 'font-sans group-hover:text-blue-600 dark:text-white'}`}>
          {lab.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          {lab.summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 dark:border-[#1A1A1A]">
        {lab.tags.map(tag => (
          <span key={tag} className="text-[9px] mono text-gray-400 uppercase tracking-widest font-bold">#{tag}</span>
        ))}
      </div>
    </motion.a>
  );
};
