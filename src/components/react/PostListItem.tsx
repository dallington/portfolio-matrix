import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { mode } from '../../store';
import type { BlogPost } from '../../types';

interface PostListItemProps {
  post: BlogPost;
}

export const PostListItem = ({ post }: PostListItemProps) => {
  const currentMode = useStore(mode);
  const isDev = currentMode === 'dev';

  return (
    <motion.a 
      href={`/blog/${post.id}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative border-b border-gray-200 dark:border-[#1A1A1A] py-14 px-8 cursor-pointer transition-all duration-500 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-white/[0.015] block`}
    >
      {isDev && (
        <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.01] transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4 mono text-[11px] font-bold tracking-widest">
          <span className={isDev ? 'text-[var(--accent)]' : 'text-blue-600'}>
            {post.date}
          </span>
          <span className="text-gray-300 dark:text-gray-700">/</span>
          <span className="text-gray-500 dark:text-gray-500">
            {post.readTime} to read
          </span>
        </div>
        <div className="flex gap-3 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-[11px] text-gray-400 dark:text-gray-600 uppercase">#{tag}</span>
          ))}
        </div>
        <h3 className={`text-2xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 transition-colors duration-500 ${isDev ? 'mono group-hover:text-[var(--accent)] tracking-tighter' : 'font-sans group-hover:text-blue-600 tracking-tight'}`}>
          {post.title}
        </h3>
        <p className={`text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 max-w-4xl text-lg font-light ${!isDev && 'font-sans'}`}>
          {post.summary}
        </p>
      </div>
      <div className={`p-4 border transition-all ml-12 hidden md:block ${isDev ? 'border-gray-200 dark:border-[#333] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]' : 'border-transparent text-blue-600 group-hover:translate-x-3'}`}>
        <ArrowRight size={32} className={isDev ? '-rotate-45 group-hover:rotate-0 transition-transform duration-700' : 'transition-transform duration-300'} />
      </div>
    </motion.a>
  );
};
