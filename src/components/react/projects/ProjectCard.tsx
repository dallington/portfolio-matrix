
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

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
