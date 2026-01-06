import React from 'react';
import { useMode } from '../../hooks/useMode';

export const ContactCTA = () => {
  const { isDev } = useMode();

  return (
    <section id="contact" className={`py-24 px-6 transition-colors duration-500 ${isDev ? 'bg-[var(--accent)] text-black' : 'bg-blue-600 text-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`text-xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-none ${!isDev && 'normal-case tracking-normal md:text-7xl'}`}>
              {isDev ? <>Let's <br /> Build_</> : <>Get in <br /> touch</>}
            </h2>
            <p className="text-2xl font-medium max-w-md leading-tight mb-12">
              Open to discussing product engineering challenges, distributed architecture, and technical leadership.
            </p>
          </div>
          <div>
            <a href="mailto:hello@dallington.dev" className={`text-4xl md:text-4xl font-black hover:underline underline-offset-8 block mb-8 break-all ${isDev ? 'mono' : 'font-sans'}`}>
              HELLO@DALLINGTON.DEV
            </a>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`p-6 border-2 text-center font-bold transition-all uppercase ${isDev ? 'border-black hover:bg-black hover:text-[var(--accent)] mono' : 'border-white hover:bg-white hover:text-blue-600 font-sans'}`}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`p-6 border-2 text-center font-bold transition-all uppercase ${isDev ? 'border-black hover:bg-black hover:text-[var(--accent)] mono' : 'border-white hover:bg-white hover:text-blue-600 font-sans'}`}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
