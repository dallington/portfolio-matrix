import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { mode } from '../../store';

export const Hero = () => {
  const currentMode = useStore(mode);
  const isDev = currentMode === 'dev';

  return (
    <section className={`min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden text-left`}>
      {isDev && <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {isDev && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#222] rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="text-[10px] mono text-gray-500 uppercase">STATUS: ARCHITECTING_DISTRIBUTED_LAYERS</span>
            </div>
          )}
          <h1 className={`text-6xl md:text-[8rem] font-black mb-6 tracking-tight leading-[0.9] text-gray-900 dark:text-white uppercase ${!isDev && 'normal-case tracking-normal md:text-[6rem]'}`}>
            {isDev ? (
              <>Systems_ <br /> <span className="text-[var(--accent)]">Architecture</span> <br /> Applied_</>
            ) : (
              <>High Performance <br /> <span className="text-blue-600">Fullstack</span> <br /> Engineering</>
            )}
          </h1>
          <p className="max-w-2xl text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-light">
            {isDev ? "I build robust distributed backends and the high-performance interfaces that reveal them." : "Senior Full-stack Engineer specializing in event-driven systems, pixel-perfect UIs, and reliable cloud-native architectures."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/#work" className={`px-10 py-5 font-black flex items-center gap-3 transition-all uppercase text-sm ${isDev ? 'bg-[var(--accent)] text-black mono' : 'bg-blue-600 text-white'}`}>
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume" className={`px-10 py-5 font-black flex items-center gap-3 transition-all uppercase text-sm border-2 ${isDev ? 'border-gray-200 dark:border-[#222] text-gray-900 dark:text-white mono' : 'border-gray-100 dark:border-[#222] text-blue-600'}`}>
              Official Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
