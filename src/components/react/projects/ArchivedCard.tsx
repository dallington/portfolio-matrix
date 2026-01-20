
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

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
