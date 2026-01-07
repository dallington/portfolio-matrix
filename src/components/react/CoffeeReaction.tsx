import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CoffeeReactionProps {
  level: number;
  totalCount: number;
  onClick: () => void;
  isDev: boolean;
}

export const CoffeeReaction: React.FC<CoffeeReactionProps> = ({ level, totalCount, onClick, isDev }) => {
  if (!isDev) return null;

  const [isHovered, setIsHovered] = useState(false);

  // Calculate fill percentage: levels 0-4 mapping to 0-100%
  // We use a slightly offset range for visual balance (10% to 90%)
  const fillPercentage = (level / 4) * 100;

  return (
    <div 
      className="flex flex-col items-center gap-6 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => level < 4 && onClick()}
    >
      <div className="relative p-8 pb-10 rounded-[2.5rem] transition-all duration-700 bg-black border border-[var(--accent)]/10 group-hover:border-[var(--accent)]/40 group-hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)]">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="relative w-20 h-20">
            {/* Steam animation - Gradual based on level */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [-5, -30 - (level * 5)], 
                    opacity: [0, (level * 0.15) + (isHovered ? 0.2 : 0), 0],
                    x: [0, Math.sin(i + level) * 10],
                    scale: [0.5, 1 + (level * 0.1)]
                  }}
                  transition={{ 
                    duration: 2.5 - (level * 0.2), 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-6 blur-[2px] rounded-full bg-[var(--accent)]/30"
                  style={{ 
                    display: level > 0 ? 'block' : 'none',
                    filter: `blur(${4 - level/2}px)`
                  }}
                />
              ))}
            </div>

            <svg viewBox="0 0 24 24" className="w-full h-full fill-none transition-transform duration-500 group-active:scale-90">
              {/* Inner fill area path - matches the interior of the cup and the bottom half of the rim */}
              <defs>
                <clipPath id="coffee-cup-clip">
                  <path d="M5 8C5 8 5 18 9 18H13C17 18 17 8 17 8 Q 11 12 5 8" />
                </clipPath>
              </defs>

              {/* Main Liquid Body */}
              <g clipPath="url(#coffee-cup-clip)">
                 <motion.rect 
                   animate={{ y: 20 - (fillPercentage * 0.12) }}
                   initial={{ y: 20 }}
                   x="0" 
                   y="0" 
                   width="24" 
                   height="24" 
                   fill="var(--accent)"
                   style={{ opacity: 0.6 }}
                 />
                 
                 {/* Surface Layer */}
                 <motion.rect
                   animate={{ y: 20 - (fillPercentage * 0.12) }}
                   initial={{ y: 20 }}
                   x="4"
                   width="14"
                   height="1"
                   fill="var(--accent)"
                   className="opacity-40"
                 />

                 {/* Surface Wave/Wobble - Subtler height to stay in bounds */}
                 <motion.path
                   animate={{ 
                     d: [
                       `M 4 ${18.5 - (fillPercentage * 0.105)} Q 11 ${18.5 - (fillPercentage * 0.105) - (level * 0.4)} 18 ${18.5 - (fillPercentage * 0.105)}`,
                       `M 4 ${18.5 - (fillPercentage * 0.105)} Q 11 ${18.5 - (fillPercentage * 0.105) + (level * 0.4)} 18 ${18.5 - (fillPercentage * 0.105)}`,
                       `M 4 ${18.5 - (fillPercentage * 0.105)} Q 11 ${18.5 - (fillPercentage * 0.105) - (level * 0.4)} 18 ${18.5 - (fillPercentage * 0.105)}`
                     ]
                   }}
                   transition={{ 
                     duration: 3, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                   stroke="var(--accent)"
                   strokeWidth="0.5"
                   className="opacity-80"
                 />
              </g>

              {/* Cup Outline - Optimized for stability */}
              <path 
                d="M17 8C17 8 17 18 13 18H9C5 18 5 8 5 8" 
                stroke="var(--accent)" 
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Cup Rim */}
              <ellipse 
                cx="11" 
                cy="8" 
                rx="6" 
                ry="2" 
                stroke="var(--accent)" 
                strokeWidth="1.2"
              />
              {/* Cup Handle */}
              <path 
                d="M17 10C17 10 20 10 20 12.5C20 15 17 15 17 15" 
                stroke="var(--accent)" 
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Total Counter Label - Now at the bottom */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
          <span className="text-[10px] mono font-black text-[var(--accent)]/40 tracking-[0.3em] uppercase">
            COLLECTED_{totalCount.toString().padStart(3, '0')}
          </span>
        </div> */}
      </div>
    </div>
  );
};
