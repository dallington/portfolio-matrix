
import React, { useState, useMemo } from 'react';
import { History, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchivedCard } from './ArchivedCard';
import type { Project } from '@/types';

interface ArchiveSectionProps {
  projects: Project[];
  isDev: boolean;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ projects, isDev }) => {
  const [archiveFilter, setArchiveFilter] = useState('All');
  const [archiveSearch, setArchiveSearch] = useState('');

  const filteredArchived = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter = archiveFilter === 'All' || p.tags.includes(archiveFilter);
      const matchesSearch = p.title.toLowerCase().includes(archiveSearch.toLowerCase()) || 
                            p.description.toLowerCase().includes(archiveSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, archiveFilter, archiveSearch]);

  const allArchiveTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [projects]);

  return (
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
  );
};
