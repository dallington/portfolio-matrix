import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  FileText, 
  Layers, 
  Target, 
  Zap,
  RotateCcw,
  ArrowRight,
  User
} from 'lucide-react';
import { useMode } from '../../hooks/useMode';

type PromptType = 'blog' | 'case-study';

const InputWrapper = ({ label, icon: Icon, children, isDev }: any) => (
  <div className="space-y-2 mb-6">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={14} className={isDev ? 'text-[var(--accent)]' : 'text-blue-600'} />
      <label className={`text-[10px] font-black uppercase tracking-widest ${isDev ? 'text-gray-500' : 'text-gray-400'}`}>
        {label}
      </label>
    </div>
    {children}
  </div>
);

export const PromptConstructor = () => {
  const { isDev } = useMode();
  const [type, setType] = useState<PromptType>('blog');
  const [copied, setCopied] = useState(false);
  
  // Blog fields
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('Senior Engineers');
  const [depth, setDepth] = useState('Deep Architecture');
  const [keyPoints, setKeyPoints] = useState('');
  
  // Case study fields
  const [projectName, setProjectName] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [metrics, setMetrics] = useState('');

  const generatePrompt = () => {
    if (type === 'blog') {
      return `Act as a world-class Senior Software Engineer and Technical Content Architect.
Write a deep-dive blog post about: ${topic || '[TOPIC]'}

Target Audience: ${audience}
Technical Depth: ${depth}

Key Points to Cover:
${keyPoints || '- Technical trade-offs\n- System scalability\n- Implementation pitfalls'}

Writing Style Requirements:
1. Use a "Technical Brutalist" tone: Confident, direct, and evidence-based.
2. Focus on "Why" and "How", not just "What".
3. Include ASCII-style architecture diagrams where helpful.
4. Optimize for clarity and technical correctness over marketing jargon.
5. Provide code examples in TypeScript or relevant back-end languages.

Ensure the post feels like a senior engineer sharing hard-won wisdom from the trenches.`;
    } else {
      return `Act as a Technical Case Study Architect.
Create a detailed engineering case study for: ${projectName || '[PROJECT NAME]'}

Structure the case study as follows:

1. THE PROBLEM (Business context & Technical constraints):
${problem || '[DESCRIPTION]'}

2. THE APPROACH (Architectural strategy & Decisions):
${solution || '[DESCRIPTION]'}

3. KEY OUTCOMES (Measurable metrics & Impact):
${metrics || '[METRICS]'}

Engineering Maturity Guidelines:
- Highlight the "Interesting Challenges" solved.
- Explain technical trade-offs (e.g., consistency vs. availability).
- Use professional engineering terminology.
- Make the outcome feel tangible and results-driven.

The final output should demonstrate senior-level architectural thinking and proven business impact.`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 transition-colors duration-500 ${isDev ? 'bg-black text-gray-400 mono' : 'bg-gray-50 dark:bg-[#0A0A0A] font-sans'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 border-b border-gray-100 dark:border-[#1A1A1A] pb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className={isDev ? 'text-[var(--accent)]' : 'text-blue-600'} size={24} />
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${isDev ? 'text-[var(--accent)]' : 'text-blue-600'}`}>
              TOOL: PROMPT_CONSTRUCTOR_v1.0
            </span>
          </div>
          <h1 className={`text-5xl md:text-8xl font-black leading-[0.9] text-gray-900 dark:text-white mb-8 ${isDev ? 'uppercase tracking-tighter' : 'tracking-tight'}`}>
            Build Better <br /> {isDev ? <span className="text-[var(--accent)]">Engineered_Prompts</span> : <span className="text-blue-600">Technical Context</span>}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Generate high-context LLM instructions to transform your engineering raw notes into polished case studies and architectural deep-dives.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-start">
          {/* Controls */}
          <section className={`p-8 border ${isDev ? 'bg-black border-gray-800' : 'bg-white dark:bg-[#121212] border-gray-100 dark:border-[#222] rounded-3xl shadow-sm'}`}>
            <div className="flex gap-4 mb-10 border-b border-gray-100 dark:border-[#1A1A1A] pb-6">
              {(['blog', 'case-study'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                    type === t 
                      ? (isDev ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-blue-600 text-white border-blue-600')
                      : (isDev ? 'border-gray-800 text-gray-500 hover:border-[var(--accent)]/50' : 'border-gray-100 text-gray-400 hover:border-blue-200 dark:border-[#222]')
                  }`}
                >
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {type === 'blog' ? (
                <>
                  <InputWrapper label="Topic_Or_Headline" icon={Terminal} isDev={isDev}>
                    <input 
                      type="text" 
                      placeholder="e.g. Distributed Caching Strategies..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                    />
                  </InputWrapper>
                  <div className="grid grid-cols-2 gap-4">
                    <InputWrapper label="Target_Audience" icon={User} isDev={isDev}>
                      <select 
                        className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all appearance-none ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                        value={audience}
                        onChange={e => setAudience(e.target.value)}
                      >
                        <option>Senior Engineers</option>
                        <option>Tech Leads</option>
                        <option>Product Owners</option>
                        <option>Junior Devs</option>
                      </select>
                    </InputWrapper>
                    <InputWrapper label="Technical_Depth" icon={Zap} isDev={isDev}>
                      <select 
                        className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all appearance-none ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                        value={depth}
                        onChange={e => setDepth(e.target.value)}
                      >
                        <option>Deep Architecture</option>
                        <option>Practical Tutorial</option>
                        <option>High Level Strategy</option>
                        <option>Code-First Review</option>
                      </select>
                    </InputWrapper>
                  </div>
                  <InputWrapper label="Core_Arguments_Bulletpoints" icon={Layers} isDev={isDev}>
                    <textarea 
                      rows={5}
                      placeholder="- Point A\n- Point B..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs resize-none' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={keyPoints}
                      onChange={e => setKeyPoints(e.target.value)}
                    />
                  </InputWrapper>
                </>
              ) : (
                <>
                  <InputWrapper label="Project_Name" icon={Terminal} isDev={isDev}>
                    <input 
                      type="text" 
                      placeholder="e.g. Infrastructure Modernization..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper label="The_Problem" icon={AlertCircle} isDev={isDev}>
                    <textarea 
                      rows={3}
                      placeholder="Legacy constraints, performance bottlenecks..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs resize-none' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={problem}
                      onChange={e => setProblem(e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper label="Technical_Solution" icon={Zap} isDev={isDev}>
                    <textarea 
                      rows={3}
                      placeholder="Service mesh implementation, database migration..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs resize-none' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={solution}
                      onChange={e => setSolution(e.target.value)}
                    />
                  </InputWrapper>
                  <InputWrapper label="Measured_Impact" icon={BarChart4} isDev={isDev}>
                    <textarea 
                      rows={3}
                      placeholder="70% latency reduction, $200k savings..." 
                      className={`w-full p-4 bg-gray-50 dark:bg-[#0A0A0A] border outline-none transition-all ${isDev ? 'mono border-gray-800 focus:border-[var(--accent)] text-xs resize-none' : 'rounded-xl border-gray-100 dark:border-[#222] focus:border-blue-600'}`}
                      value={metrics}
                      onChange={e => setMetrics(e.target.value)}
                    />
                  </InputWrapper>
                </>
              )}
              
              <button 
                onClick={() => {
                  setTopic(''); setKeyPoints(''); setProjectName(''); setProblem(''); setSolution(''); setMetrics('');
                }}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase transition-colors hover:text-red-500 pt-4`}
              >
                <RotateCcw size={12} /> Reset_Constructor
              </button>
            </div>
          </section>

          {/* Output */}
          <section className="sticky top-32">
            <div className={`p-8 border ${isDev ? 'bg-black border-[var(--accent)]/30 mono' : 'bg-slate-900 border-slate-800 rounded-3xl shadow-2xl'}`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={16} className={isDev ? 'text-[var(--accent)]' : 'text-blue-400'} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Generated_Output</h3>
                </div>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase transition-all ${
                    isDev 
                      ? 'bg-[var(--accent)] text-black' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 rounded-lg'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'COPIED' : 'COPY_PROMPT'}
                </button>
              </div>
              
              <div className={`relative group`}>
                <div className={`p-6 bg-black/40 border border-gray-800/50 min-h-[500px] text-xs leading-relaxed whitespace-pre-wrap overflow-y-auto ${isDev ? 'text-[var(--accent)]/80' : 'text-slate-300 font-sans'}`}>
                  {generatePrompt()}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
            
            {isDev && (
              <div className="mt-8 flex gap-4 items-center px-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-500 uppercase font-black">Ready_for_deployment_to_LLM</span>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const AlertCircle = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const BarChart4 = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="M13 17V9" />
    <path d="M18 17V5" />
    <path d="M8 17v-3" />
  </svg>
);
