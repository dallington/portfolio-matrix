
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Terminal, 
  Clock, 
  Zap, 
  Layers, 
  Search, 
  Filter, 
  ChevronRight,
  History,
  Activity,
  Award
} from 'lucide-react';
import { HERO_PROJECTS } from './constants';
import { ProjectCard, InProgressCard, ArchivedCard } from '../ProjectShowcase';
import type { Project } from './types';
import { useMode } from './ModeContext';

interface WorksPageProps {
  onSelectProject: (project: Project) => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({ onSelectProject }) => {
  const { isDev } = useMode();
  const [archiveFilter, setArchiveFilter] = useState('All');
  const [archiveSearch, setArchiveSearch] = useState('');

  const showcase = HERO_PROJECTS.filter(p => p.category === 'showcase');
  const inProgress = HERO_PROJECTS.filter(p => p.category === 'in-progress');
  const archived = HERO_PROJECTS.filter(p => p.category === 'archived');

  const filteredArchived = useMemo(() => {
    return archived.filter(p => {
      const matchesFilter = archiveFilter === 'All' || p.tags.includes(archiveFilter);
      const matchesSearch = p.title.toLowerCase().includes(archiveSearch.toLowerCase()) || 
                            p.description.toLowerCase().includes(archiveSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [archived, archiveFilter, archiveSearch]);

  const allArchiveTags = useMemo(() => {
    const tags = new Set<string>();
    archived.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [archived]);

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 ${isDev ? 'bg-black text-gray-400 mono' : 'bg-white text-slate-900 font-sans'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
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

        {/* 1. SHOWCASE / HIGHLIGHTS */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 whitespace-nowrap">
               <Award size={18} className="text-accent" /> 01_CASE_STUDIES
            </h2>
            <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {showcase.map(project => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} isDev={isDev} />
            ))}
          </div>
        </section>

        {/* 2. BUILD NOW / IN PROGRESS */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 whitespace-nowrap">
               <Activity size={18} className="text-accent" /> 02_ACTIVE_DEVELOPMENT
            </h2>
            <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
          </div>

          <div className="relative">
            {/* Timeline Line (Vertical for Desktop) */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-800 hidden lg:block" />
            
            <div className="space-y-12 pl-0 lg:pl-20">
              {inProgress.map((project, idx) => (
                <div key={project.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-16 top-10 w-4 h-4 rounded-full bg-black border-2 border-accent z-10 hidden lg:block" />
                  <InProgressCard project={project} isDev={isDev} onSelect={onSelectProject} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE ARCHIVE */}
        <section className="pt-24 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 whitespace-nowrap mb-6">
                 <History size={18} className="text-accent" /> 03_THE_ARCHIVE
              </h2>
              <p className="max-w-md text-sm text-gray-500">Past experiments, open-source utilities, and retired platforms.</p>
            </div>
            
            {/* Filter UI */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <div className="relative group">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search_Archive..."
                    value={archiveSearch}
                    onChange={(e) => setArchiveSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-xs outline-none focus:border-accent w-full sm:w-64 transition-all"
                  />
               </div>
               <div className="flex flex-wrap gap-2">
                  {allArchiveTags.slice(0, 5).map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setArchiveFilter(tag)}
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${archiveFilter === tag ? 'bg-accent text-black border-accent' : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-400'}`}
                    >
                      {tag}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArchived.map(project => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ArchivedCard project={project} isDev={isDev} />
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredArchived.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-800 text-xs font-black uppercase text-gray-600">
                0_PROJECTS_MATCH_CURRENT_FILTER
              </div>
            )}
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="mt-32 pt-24 border-t border-gray-100 dark:border-gray-800 text-center">
           <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">
              Let's_Architect_Something_New_
           </h3>
           <button 
             onClick={() => {
               window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
             }}
             className="px-10 py-5 bg-accent text-black font-black uppercase text-sm inline-flex items-center gap-4 transition-all hover:scale-105"
           >
              INITIATE_CONTACT <ArrowRight size={18} />
           </button>
        </footer>

      </div>
    </div>
  );
};
export const WorksPageWrapper: React.FC = () => {
  const handleSelectProject = (project: Project) => {
    window.location.href = `/projects/${project.id}`;
  };

  return <WorksPage onSelectProject={handleSelectProject} />;
};
