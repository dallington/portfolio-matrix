
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Clock, RefreshCw } from 'lucide-react';
import { HERO_PROJECTS } from './constants';
import type { Project } from './types';
import { useMode } from './ModeContext';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
  showOnlyShowcase?: boolean;
}

export const ProjectShowcase = ({ onSelectProject, showOnlyShowcase = false }: ProjectShowcaseProps) => {
  const { isDev } = useMode();

  const showcase = HERO_PROJECTS.filter(p => p.category === 'showcase');
  const inProgress = HERO_PROJECTS.filter(p => p.category === 'in-progress');
  const archived = HERO_PROJECTS.filter(p => p.category === 'archived');

  return (
    <section id="work" className={`py-24 px-6 ${isDev ? 'bg-white dark:bg-[#0A0A0A]' : 'bg-gray-50 dark:bg-[#0A0A0A]'}`}>
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Tier 1: Showcase / Highlights */}
        <div>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              {isDev && <div className="text-[var(--accent)] mono mb-4 font-bold tracking-widest">// PROVEN_SOLUTIONS</div>}
              <h2 className={`text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.8] ${!isDev && 'normal-case tracking-normal md:text-7xl'}`}>
                {isDev ? 'Showcase_ Highlights' : 'Selected Case Studies'}
              </h2>
            </div>
            {!showOnlyShowcase && (
              <p className="max-w-md text-gray-500 text-sm leading-relaxed">
                Client projects where technical excellence met measurable business impact.
              </p>
            )}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {showcase.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} isDev={isDev} />
            ))}
          </div>
        </div>

        {!showOnlyShowcase && (
          <>
            {/* Tier 2: Build Now / In Progress */}
            <div className="pt-12 border-t border-gray-100 dark:border-[#1A1A1A]">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  {isDev && <div className="text-[var(--accent)] mono mb-4 font-bold tracking-widest">// CURRENT_INSTANCES</div>}
                  <h2 className={`text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter ${!isDev && 'normal-case tracking-normal'}`}>
                    {isDev ? 'Active_Development' : 'Build Now'}
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inProgress.map((project) => (
                  <InProgressCard key={project.id} project={project} isDev={isDev} onSelect={onSelectProject} />
                ))}
              </div>
            </div>

            {/* Tier 3: Old Projects / Archive */}
            <div className="pt-12 border-t border-gray-100 dark:border-[#1A1A1A]">
              <div className="mb-12 flex items-center justify-between">
                <h2 className={`text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest ${!isDev && 'normal-case tracking-normal'}`}>
                  {isDev ? 'The_Archive' : 'Past Projects'}
                </h2>
                <div className="h-px flex-1 mx-8 bg-gray-100 dark:bg-[#1A1A1A]" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {archived.map((project) => (
                  <ArchivedCard key={project.id} project={project} isDev={isDev} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// --- Exporting Cards for dedicated WorksPage ---

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  isDev: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, isDev }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`group relative border p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-all ${isDev ? 'bg-gray-50 dark:bg-[#121212] border-gray-200 dark:border-[#222]' : 'bg-white dark:bg-[#121212] border-gray-100 dark:border-[#222] shadow-sm hover:shadow-xl'}`}
    onClick={() => onSelect(project)}
  >
    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
      <ArrowUpRight size={24} className={`text-[var(--accent)] ${!isDev && 'text-blue-600'}`} />
    </div>
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="text-[9px] mono px-2 py-0.5 border border-gray-200 dark:border-[#333] text-gray-400 uppercase tracking-widest font-bold">#{tag}</span>
        ))}
      </div>
      <h3 className={`text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight transition-colors ${isDev ? 'mono group-hover:text-[var(--accent)]' : 'font-sans group-hover:text-blue-600'}`}>
        {project.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 text-lg font-light leading-relaxed">{project.description}</p>
      <div className={`p-5 border-l-4 mb-8 ${isDev ? 'bg-white dark:bg-black/40 border-[var(--accent)]' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-600'}`}>
        <p className={`text-sm italic font-bold tracking-tight ${isDev ? 'text-[var(--accent)]' : 'text-blue-600'}`}>"{project.impact}"</p>
      </div>
    </div>
    <div className={`grid grid-cols-3 gap-4 border-t pt-8 mt-auto ${isDev ? 'border-gray-200 dark:border-[#222]' : 'border-gray-100 dark:border-[#222]'}`}>
      {project.metrics.map(m => (
        <div key={m.label}>
          <div className="text-[9px] mono text-gray-400 mb-1 uppercase tracking-widest font-bold">{m.label}</div>
          <div className="text-lg font-black text-gray-900 dark:text-white">{m.value}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

interface InProgressCardProps {
  project: Project;
  isDev: boolean;
  onSelect: (project: Project) => void;
}

export const InProgressCard: React.FC<InProgressCardProps> = ({ project, isDev, onSelect }) => (
  <div className={`p-8 border flex flex-col justify-between transition-all hover:border-[var(--accent)]/50 group ${isDev ? 'bg-black border-gray-800 mono' : 'bg-white dark:bg-[#121212] border-gray-100 dark:border-[#222] rounded-2xl'}`}>
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${project.status === 'Developing' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDev ? 'text-[var(--accent)]' : 'text-green-600'}`}>{project.status}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1"><Clock size={10}/> {project.updatedAt}</span>
      </div>
      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight cursor-pointer hover:text-accent" onClick={() => onSelect(project)}>{project.title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">{project.description}</p>
      
      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase">
          <span>PROGRESS_STATE</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-1 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${project.progress}%` }}
            className={`h-full ${isDev ? 'bg-[var(--accent)]' : 'bg-blue-600'}`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-800 pb-1 flex items-center gap-1">
          <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-700" /> RECENT_CHANGELOG
        </div>
        {project.changelog?.map((log, i) => (
          <div key={i} className="text-[10px] text-gray-500 flex gap-2">
            <span className="text-accent shrink-0">»</span> {log}
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface ArchivedCardProps {
  project: Project;
  isDev: boolean;
}

export const ArchivedCard: React.FC<ArchivedCardProps> = ({ project, isDev }) => (
  <div className={`p-6 border flex flex-col justify-between group transition-all hover:bg-white/5 ${isDev ? 'bg-black border-gray-800 mono' : 'bg-white dark:bg-[#121212] border-gray-100 dark:border-[#222] rounded-xl shadow-sm'}`}>
    <div>
      <div className="flex gap-1 mb-4">
        {project.tags.slice(0, 2).map(t => (
          <span key={t} className="text-[8px] font-bold text-gray-500">#{t}</span>
        ))}
      </div>
      <h4 className="text-sm font-black text-gray-900 dark:text-white mb-2 uppercase leading-snug">{project.title}</h4>
      <p className="text-[11px] text-gray-500 line-clamp-2 mb-6">{project.description}</p>
    </div>
    <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
      {project.githubUrl && (
        <a href={project.githubUrl} className="text-gray-400 hover:text-[var(--accent)] transition-colors" target="_blank" rel="noreferrer">
          <Github size={16} />
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} className="text-gray-400 hover:text-[var(--accent)] transition-colors" target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
        </a>
      )}
      <div className="ml-auto text-[10px] font-bold text-gray-600">{project.year}</div>
    </div>
  </div>
);
