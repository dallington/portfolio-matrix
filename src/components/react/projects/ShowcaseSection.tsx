
import React from 'react';
import { Award } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

interface ShowcaseSectionProps {
  projects: Project[];
  isDev: boolean;
  onSelectProject: (project: Project) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ projects, isDev, onSelectProject }) => (
  <section className="mb-32">
    <div className="flex items-center gap-6 mb-16">
      <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 whitespace-nowrap">
          <Award size={18} className="text-accent" /> 01_CASE_STUDIES
      </h2>
      <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
    </div>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} onSelect={onSelectProject} isDev={isDev} />
      ))}
    </div>
  </section>
);
