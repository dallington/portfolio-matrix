import React from 'react';
import { useMode } from '../../hooks/useMode';
import { ChevronLeft, Terminal, Activity, FlaskConical } from 'lucide-react';

interface LabData {
  title: string;
  type: string;
  difficulty: string;
  hypothesis: string;
  findings: string[];
  tags: string[];
  component: string;
}

interface LabDetailProps {
  lab: {
    data: LabData;
  };
  children?: React.ReactNode;
}

export const LabDetail = ({ lab, children }: LabDetailProps) => {
  const { isDev } = useMode();
  const { title, type, difficulty, hypothesis, findings, tags } = lab.data;

  const accentColor = isDev ? 'text-[var(--accent)]' : 'text-blue-600';
  const accentBorder = isDev ? 'border-[var(--accent)]' : 'border-blue-600';
  const accentBg = isDev ? 'bg-[var(--accent)]/5' : 'bg-blue-50 dark:bg-blue-900/5';

  return (
    <article className="pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <a
            href="/labs"
            className={`flex items-center gap-2 mb-8 font-bold transition-all ${isDev ? 'mono text-xs text-[var(--accent)] hover:-translate-x-2' : 'font-sans text-blue-600 hover:text-blue-700'}`}
          >
            <ChevronLeft size={16} /> {isDev ? 'RETURN_TO_EXPERIMENTAL_INDEX' : 'Back to Labs'}
          </a>
        </div>

        <header className="border-b border-gray-100 dark:border-[#1A1A1A] pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-[10px] font-black uppercase border font-bold ${isDev ? 'mono border-[var(--accent)] text-[var(--accent)]' : 'font-sans border-blue-600 text-blue-600'}`}>
                  {type}
                </span>
                <span className={`text-[10px] font-black uppercase mono text-gray-500`}>
                  DIFFICULTY: {difficulty}
                </span>
              </div>
              <h1 className={`text-5xl md:text-8xl font-black leading-[0.9] text-gray-900 dark:text-white tracking-tight ${isDev ? 'mono uppercase' : 'font-sans'}`}>
                {isDev ? title.toUpperCase().replace(/\s+/g, '_') : title}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] mono font-bold text-gray-400 uppercase mb-1">
                  {isDev ? 'TELEMETRY_LINK_02' : 'Telemetry Status'}
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isDev ? 'bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]' : 'bg-red-500'}`} />
                  <span className={`text-xs font-black mono uppercase dark:text-white`}>
                    {isDev ? 'LIVE_STREAM_SYNC' : 'Live_Simulation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={`p-8 border-l-4 ${accentBg} ${accentBorder}`}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} className="text-gray-400" />
            <span className="text-[10px] mono font-bold text-gray-400 uppercase tracking-widest">
              {isDev ? 'HYPOTHESIS_CORE_0x1' : 'Architectural_Hypothesis'}
            </span>
          </div>
          <p className={`text-xl md:text-3xl font-light italic leading-relaxed ${isDev ? 'mono text-gray-300' : 'font-sans text-gray-700 dark:text-gray-200'}`}>
            "{hypothesis}"
          </p>
        </div>

        <section className="relative group">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-gray-400" />
              <h4 className={`text-sm font-black uppercase tracking-widest font-sans ${accentColor}`}>
                {isDev ? 'SANDBOX_ENV_ISOLATED' : 'Interactive_Environment'}
              </h4>
            </div>
            <div className="text-[10px] mono text-gray-400">
              {isDev ? 'INSTANCE_ID: ' : 'SESSION_ID: '} 0x{Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}
            </div>
          </div>
          <div className="min-w-0">
             {children}
          </div>
        </section>

        <div className="pt-16 border-t border-gray-100 dark:border-[#1A1A1A]">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16">
            <div className="space-y-8">
              <h3 className={`text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white ${isDev ? 'mono' : 'font-sans'}`}>
                {isDev ? 'DATA_REPLICATION_FINDINGS' : 'Experimental_Findings'}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {findings.map((f, i) => (
                  <div key={i} className={`p-6 border transition-all hover:translate-y-1 rounded-xl ${isDev ? 'bg-black border-[var(--accent)]/20' : 'bg-gray-50 dark:bg-[#121212] border-gray-100 dark:border-[#222]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black mb-4 ${isDev ? 'bg-[var(--accent)] text-black' : 'bg-blue-600 text-white'}`}>
                      {i + 1}
                    </div>
                    <p className={`text-sm font-medium leading-relaxed ${isDev ? 'mono text-gray-400' : 'font-sans text-gray-600 dark:text-gray-300'}`}>
                      {f}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="space-y-8">
              <div>
                <h4 className="text-[10px] mono text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-[#1A1A1A] pb-2">
                  {isDev ? 'RESOURCE_TAGS' : 'Technical_Tags'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className={`px-3 py-1 text-[9px] mono font-black uppercase tracking-tighter border ${isDev ? 'bg-black border-[var(--accent)]/30 text-[var(--accent)]' : 'bg-gray-100 dark:bg-[#1A1A1A] border-gray-200 dark:border-[#222] text-gray-500'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
};
