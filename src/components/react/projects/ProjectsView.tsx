
import React from 'react';
import { useMode } from '@/hooks/useMode';
import { HERO_PROJECTS } from '@/data/projects';
import type { Project } from '@/types';
import { Header } from './Header';
import { Footer } from './Footer';
import { ShowcaseSection } from './ShowcaseSection';
import { InProgressSection } from './InProgressSection';
import { ArchiveSection } from './ArchiveSection';

interface ProjectsViewProps {
  onSelectProject?: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject }) => {
  const { isDev } = useMode();

  const handleSelectProject = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      window.location.href = `/projects/${project.id}`;
    }
  };

  const showcase = HERO_PROJECTS.filter(p => p.category === 'showcase');
  const inProgress = HERO_PROJECTS.filter(p => p.category === 'in-progress');
  const archived = HERO_PROJECTS.filter(p => p.category === 'archived');

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 ${isDev ? 'bg-black text-gray-400 mono' : 'bg-white text-slate-900 font-sans'}`}>
      <div className="max-w-7xl mx-auto">
        <Header isDev={isDev} />
        
        <ShowcaseSection 
          projects={showcase} 
          isDev={isDev} 
          onSelectProject={handleSelectProject} 
        />
        
        <InProgressSection 
          projects={inProgress} 
          isDev={isDev} 
          onSelectProject={handleSelectProject} 
        />
        
        <ArchiveSection 
          projects={archived} 
          isDev={isDev} 
        />
        
        <Footer />
      </div>
    </div>
  );
};
