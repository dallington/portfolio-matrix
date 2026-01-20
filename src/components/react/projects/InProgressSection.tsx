
import React from 'react';
import { Activity } from 'lucide-react';
import { InProgressCard } from './InProgressCard';
import type { Project } from '@/types';

interface InProgressSectionProps {
  projects: Project[];
  isDev: boolean;
  onSelectProject: (project: Project) => void;
}

export const InProgressSection: React.FC<InProgressSectionProps> = ({ projects, isDev, onSelectProject }) => (
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
        {projects.map((project) => (
          <div key={project.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-16 top-10 w-4 h-4 rounded-full bg-black border-2 border-accent z-10 hidden lg:block" />
            <InProgressCard project={project} isDev={isDev} onSelect={onSelectProject} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
