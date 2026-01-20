
import React from 'react';
import { Layers } from 'lucide-react';

interface HeaderProps {
  isDev: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isDev }) => (
  <header className="mb-24">
    <div className="flex items-center gap-3 mb-4">
      <Layers className={isDev ? 'text-[var(--accent)]' : 'text-blue-600'} size={24} />
      <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDev ? 'text-[var(--accent)]' : 'text-blue-600'}`}>
        ENGINEER_WORKS_ARCHIVE
      </span>
    </div>
    <h1 className={`text-6xl md:text-9xl font-black leading-[0.8] mb-8 uppercase tracking-tighter text-gray-900 dark:text-white`}>
      Selected_ <br /> {isDev ? <span className="text-[var(--accent)]">Instances_</span> : <span className="text-blue-600">Creations_</span>}
    </h1>
    <p className="max-w-2xl text-xl font-light leading-relaxed text-gray-500">
      A comprehensive record of systems, architectures, and interfaces engineered to solve complex digital challenges.
    </p>
  </header>
);
