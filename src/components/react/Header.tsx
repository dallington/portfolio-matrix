import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, User, Search } from 'lucide-react';
import { useMode } from '../../hooks/useMode';
import { setPaletteOpen } from '../../store';

export const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const { isDev, toggleMode } = useMode();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextValue = !isDark;
    setIsDark(nextValue);
    if (nextValue) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ${isDev ? 'border-gray-200 dark:border-[#1A1A1A] bg-white/80 dark:bg-[#0A0A0A]/80' : 'border-gray-100 dark:border-[#1A1A1A] bg-white/95 dark:bg-[#0A0A0A]/95'} backdrop-blur-md px-6 py-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-bold text-black transition-colors ${isDev ? 'bg-[var(--accent)] mono' : 'bg-blue-600 text-white font-sans'}`}>D</div>
          <span className={`font-bold tracking-tighter hidden sm:block text-gray-900 dark:text-white ${isDev ? 'mono' : 'font-sans tracking-normal'}`}>
            {isDev ? 'DALLINGTON_' : 'Dallington'}
          </span>
        </a>
        
        <div className="flex items-center gap-4 md:gap-8">
          <nav className={`hidden md:flex gap-6 text-sm font-medium ${isDev ? 'mono text-gray-600 dark:text-gray-400' : 'font-sans text-gray-500'}`}>
            <a href="/#work" className={`hover:text-[var(--accent)] transition-colors ${!isDev && 'hover:text-blue-600'}`}>WORK</a>
            <a href="/labs" className={`hover:text-[var(--accent)] transition-colors ${!isDev && 'hover:text-blue-600'}`}>LAB</a>
            <a href="/resume" className={`hover:text-[var(--accent)] transition-colors ${!isDev && 'hover:text-blue-600'}`}>RESUME</a>
            <a href="/about" className={`hover:text-[var(--accent)] transition-colors ${!isDev && 'hover:text-blue-600'}`}>ABOUT</a>
            <a href="/blog" className={`hover:text-[var(--accent)] transition-colors ${!isDev && 'hover:text-blue-600'}`}>BLOG</a>
          </nav>

          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-[#222] pl-4 md:pl-8">
            <button 
              onClick={() => setPaletteOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                isDev 
                  ? 'border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10' 
                  : 'border-gray-200 dark:border-[#333] text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Search size={14} />
              <span className="mono">CMD+K</span>
            </button>

            <button 
              onClick={toggleMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${isDev ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20' : 'bg-blue-600 text-white'}`}
              title={isDev ? "Switch to Recruiter Mode" : "Switch to Dev Mode"}
            >
              {isDev ? <Monitor size={14} /> : <User size={14} />}
              <span className="hidden lg:inline">{isDev ? 'DEV_MODE_ON' : 'RECRUITER_MODE'}</span>
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
