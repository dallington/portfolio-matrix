import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { mode } from '../../store';

interface CoffeeReactionProps {
  initialLevel?: number;
}

export const CoffeeReaction = ({ initialLevel = 0 }: CoffeeReactionProps) => {
  const currentMode = useStore(mode);
  const isDev = currentMode === 'dev';
  const [level, setLevel] = useState(initialLevel);
  
  const labels = ["Unreacted", "Good", "Nice", "Very good", "Excellent"];
  const fillPercents = [0, 25, 50, 75, 100];
  
  const handleClick = () => {
    if (level < 4) setLevel(level + 1);
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        onClick={handleClick}
        className={`relative w-24 h-24 cursor-pointer transition-all active:scale-90 group ${level === 4 ? 'cursor-default pointer-events-none' : ''}`}
        title={labels[level]}
      >
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-10 border-4 rounded-r-xl border-current transition-colors duration-500 ${level > 0 ? (isDev ? 'text-[var(--accent)]' : 'text-blue-600') : 'text-gray-300 dark:text-gray-700'}`} />
        <div className={`absolute inset-0 right-4 border-4 rounded-b-3xl border-current transition-colors duration-500 overflow-hidden bg-transparent ${level > 0 ? (isDev ? 'text-[var(--accent)]' : 'text-blue-600') : 'text-gray-300 dark:text-gray-700'}`}>
          <motion.div 
            initial={false}
            animate={{ 
              height: `${fillPercents[level]}%`,
              backgroundColor: isDev ? 'var(--accent)' : '#2563eb' 
            }}
            className="absolute bottom-0 left-0 right-0 opacity-80"
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {level > 0 && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-pulse" />
            )}
          </motion.div>
        </div>
      </div>
      <div className="text-center">
        <h3 className={`text-2xl font-black mb-2 ${isDev ? 'mono uppercase' : 'font-sans dark:text-white'}`}>
          {level === 0 ? 'Fuel the author?' : labels[level]}
        </h3>
      </div>
    </div>
  );
};
