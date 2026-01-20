import React, { useState, useMemo } from 'react';
import { BlogLayout } from './BlogLayout';
import { Copy, Eye, Edit3, CheckCircle2 } from 'lucide-react';
import { useMode } from '../../hooks/useMode';

export const AdminEditor = () => {
    const { isDev } = useMode();
    const [view, setView] = useState<'edit' | 'preview'>('edit');
    const [copied, setCopied] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [tags, setTags] = useState('');
    const [readTime, setReadTime] = useState('5 min read');
    const [body, setBody] = useState('');

    const postData = useMemo(() => ({
        id: 'preview',
        slug: 'preview',
        body: body,
        data: {
            title: title || 'Post Title',
            date: date,
            readTime: readTime,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        }
    }), [title, date, tags, readTime, body]);

    const generateMDX = () => {
        const frontmatter = `---
title: "${title}"
date: "${date}"
readTime: "${readTime}"
tags: [${tags.split(',').map(t => `"${t.trim()}"`).filter(t => t !== '""').join(', ')}]
---
`;
        return `${frontmatter}\n${body}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateMDX());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] pt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className={`text-4xl font-black uppercase tracking-tighter ${
                            isDev ? "mono text-[var(--accent)]" : "text-gray-900 dark:text-white"
                        }`}>
                            {isDev ? "ADMIN_POST_CONSTRUCTOR" : "Create Blog Post"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 mono text-xs uppercase">
                            Status: Drafting_Mode
                        </p>
                    </div>

                    <div className="flex bg-white dark:bg-[#111] p-1 border border-gray-200 dark:border-[#222] rounded-lg shadow-sm">
                        <button
                            onClick={() => setView('edit')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-md ${
                                view === 'edit' 
                                    ? (isDev ? "bg-[var(--accent)] text-black" : "bg-blue-600 text-white")
                                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <Edit3 size={16} /> Edit
                        </button>
                        <button
                            onClick={() => setView('preview')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-md ${
                                view === 'preview'
                                    ? (isDev ? "bg-[var(--accent)] text-black" : "bg-blue-600 text-white")
                                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <Eye size={16} /> Preview
                        </button>
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-6 py-2.5 text-sm font-black uppercase transition-all border-2 ${
                            copied 
                                ? "border-green-500 text-green-500 bg-green-500/5"
                                : isDev 
                                    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 size={16} /> Copied!
                            </>
                        ) : (
                            <>
                                <Copy size={16} /> Copy MDX
                            </>
                        )}
                    </button>
                </div>

                {view === 'edit' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Meta Inputs */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-xl space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-2 mono">Post Title</label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Epic Engineering Post"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#222] p-3 text-sm focus:border-[var(--accent)] outline-none transition-colors dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-2 mono">Date</label>
                                    <input 
                                        type="date" 
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#222] p-3 text-sm focus:border-[var(--accent)] outline-none transition-colors dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-2 mono">Tags (comma separated)</label>
                                    <input 
                                        type="text" 
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        placeholder="react, typescript, architecture"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#222] p-3 text-sm focus:border-[var(--accent)] outline-none transition-colors dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-2 mono">Read Time</label>
                                    <input 
                                        type="text" 
                                        value={readTime}
                                        onChange={(e) => setReadTime(e.target.value)}
                                        placeholder="5 min read"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#222] p-3 text-sm focus:border-[var(--accent)] outline-none transition-colors dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Body Input */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-xl overflow-hidden h-[600px] flex flex-col">
                                <div className="px-6 py-4 border-b border-gray-100 dark:border-[#222] flex justify-between items-center">
                                    <span className="text-xs font-black uppercase text-gray-400 mono">Content_Body (MDX)</span>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                    </div>
                                </div>
                                <textarea 
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="# Write your post here..."
                                    className="flex-1 w-full bg-transparent p-6 text-sm mono focus:outline-none resize-none dark:text-white leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border border-gray-200 dark:border-[#222] rounded-2xl overflow-hidden bg-white dark:bg-[#0A0A0A]">
                        <div className="bg-gray-100 dark:bg-[#111] px-6 py-3 flex items-center justify-between border-b border-gray-200 dark:border-[#222]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-[#333]" />
                                <span className="text-[10px] mono text-gray-500 uppercase">Live_Preview_Rendered</span>
                            </div>
                            <button onClick={() => setView('edit')} className="text-[10px] mono text-[var(--accent)] hover:underline">Exit_Preview</button>
                        </div>
                        <div className="max-h-[80vh] overflow-y-auto">
                            <BlogLayout post={postData as any} previewMode={true} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
