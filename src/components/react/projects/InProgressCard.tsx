
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw } from 'lucide-react';
import type { Project } from '@/types';

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
