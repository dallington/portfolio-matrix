import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, ChevronLeft, Clock, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMode } from "../../hooks/useMode";
import { CoffeeReaction } from "./CoffeeReaction";

// Define types locally if not imported
interface BlogPost {
	id: string;
	slug: string;
	body: string; // MDX content body
	data: {
		title: string;
		date: string;
		readTime: string;
		tags: string[];
	};
}

interface BlogLayoutProps {
	post: BlogPost;
	onBack?: () => void; // Optional if handled via simple link
	previewMode?: boolean;
}

export const BlogLayout = ({ post, onBack, previewMode = false }: BlogLayoutProps) => {
	const { isDev } = useMode();
	const { scrollYProgress } = useScroll();
	// Using generic motion div for line progress, simplify spring usage or just use raw scrollYProgress if spring causes issues in strict mode
	// The user code used useSpring from framer-motion? No, framer-motion has useSpring too, but usually it returns a motion value.
	// Assuming standard framer-motion usage:
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	// Persistence logic for reaction level (this specific user's level)
	const levelKey = useMemo(() => `coffee_lvl_${post.id}`, [post.id]);
	// Persistence logic for total clicks (simulating global count)
	const totalKey = useMemo(() => `coffee_total_${post.id}`, [post.id]);

	const [reactionLevel, setReactionLevel] = useState(0);
	const [totalClicks, setTotalClicks] = useState(0);

	// Load from localStorage on mount
	useEffect(() => {
		const savedLevel = localStorage.getItem(levelKey);
		const savedTotal = localStorage.getItem(totalKey);
		if (savedLevel) setReactionLevel(parseInt(savedLevel, 10));
		if (savedTotal) setTotalClicks(parseInt(savedTotal, 10));
	}, [levelKey, totalKey]);

	const handleReaction = () => {
		// Current user can only contribute up to 4 levels
		if (reactionLevel < 4) {
			const nextLevel = reactionLevel + 1;
			setReactionLevel(nextLevel);
			localStorage.setItem(levelKey, nextLevel.toString());
		}

		// Total clicks always increments (simulating DB update)
		const nextTotal = totalClicks + 1;
		setTotalClicks(nextTotal);
		localStorage.setItem(totalKey, nextTotal.toString());
	};

	const [activeId, setActiveId] = useState<string>("");

	// Use post.body for content as it comes from Astro collection
	const content = post.body;

	useEffect(() => {
		// Only scroll if strictly needed on mount, mostly Astro handles scroll restoration
		// window.scrollTo(0, 0);
	}, []);

	const tableOfContents = useMemo(() => {
		if (!content) return [];
		return content
			.split("\n")
			.filter(
				(line) =>
					line.startsWith("#") ||
					line.startsWith("##") ||
					line.startsWith("###"),
			)
			.map((line) => {
				const levelMatch = line.match(/^#+/);
				const level = levelMatch ? levelMatch[0].length : 1;
				const text = line.replace(/^#+\s*/, "").replace(/[*_[\]]/g, ""); // Clean markdown syntax
				const id = text
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-");
				return { level, text, id };
			});
	}, [content]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id);
				});
			},
			{ rootMargin: "-100px 0px -66% 0px" },
		);
		const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");
		headings.forEach((heading) => observer.observe(heading));
		return () => observer.disconnect();
	}, []);

	const scrollToId = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			window.scrollTo({
				top: el.getBoundingClientRect().top + window.scrollY - 120,
				behavior: "smooth",
			});
		}
	};

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			window.location.href = "/blog"; // Default/Fallback navigation
		}
	};

	return (
		<article className="pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
			<motion.div
				className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] z-[60] origin-left"
				style={{ scaleX }}
			/>
			<div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-16">
				
				<div className="min-w-0">
					{ !previewMode && (
						<button
							onClick={handleBack}
							className={`flex items-center gap-2 mb-12 font-bold transition-all ${isDev ? "mono text-xs text-[var(--accent)] hover:-translate-x-2" : "font-sans text-blue-600 hover:text-blue-700"}`}
						>
							<ChevronLeft size={16} /> {isDev ? "BACK_TO_LOGS" : "Back to Blog"}
						</button>
						)
					}
					<header className="mb-16">
						<div className="flex items-center gap-4 mb-6">
							{post.data.tags.map((t) => (
								<span
									key={t}
									className="text-[10px] mono text-gray-400 uppercase tracking-[0.2em]"
								>
									#{t}
								</span>
							))}
						</div>
						<h1
							className={`text-4xl md:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8 ${isDev ? "mono uppercase" : "font-sans"}`}
						>
							{post.data.title}
						</h1>
						<div className="flex items-center gap-8 py-6 border-y border-gray-100 dark:border-[#1A1A1A]">
							<div className="flex items-center gap-2">
								<Calendar size={14} className="text-gray-400" />
								<span
									className={`text-xs font-bold uppercase mono ${isDev ? "text-[var(--accent)]" : "text-blue-600"}`}
								>
									{new Date(post.data.date).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock size={14} className="text-gray-400" />
								<span className="text-xs font-bold uppercase mono text-gray-500">
									{post.data.readTime}
								</span>
							</div>
						</div>
					</header>

					<div
						className={`prose prose-lg dark:prose-invert max-w-none transition-colors duration-500 mb-24 text-gray-600 dark:text-gray-400  ${isDev ? "font-mono" : "font-sans"}`}
					>
						{content.split("\n").map((line, i) => {
							const text = line.replace(/^#+\s*/, "").replace(/[*_[\]]/g, "");
							const id = text
								.toLowerCase()
								.replace(/[^\w\s-]/g, "")
								.replace(/\s+/g, "-");

							if (line.startsWith("# "))
								return (
									<h1
										id={id}
										key={i}
										className="text-4xl font-black mb-8 mt-12 scroll-mt-32"
									>
										{text}
									</h1>
								);
							if (line.startsWith("## "))
								return (
									<h2
										id={id}
										key={i}
										className="text-3xl font-black mb-6 mt-10 border-b border-gray-100 dark:border-[#222] pb-2 scroll-mt-32"
									>
										{text}
									</h2>
								);
							if (line.startsWith("### "))
								return (
									<h3
										id={id}
										key={i}
										className="text-xl font-bold mb-4 mt-8 scroll-mt-32"
									>
										{text}
									</h3>
								);
							if (line.startsWith("```")) {
								// Simplified code block handling for "manual" renderer
								const isEnding = line.length === 3;
								if (isEnding) return null; // Or render closing div if we were tracking state, but map is stateless.
								// Note: The user's snippet logic for code blocks is very rudimentary.
								// Ideally this should use MDX renderer, but we are sticking to the requested "manual split" logic for now.
								return (
									<div
										key={i}
										className="mono text-[10px] uppercase text-gray-500 mb-2 mt-4 tracking-widest"
									>
										Code Block / Source
									</div>
								);
							}
							if (line.trim() === "") return <div key={i} className="h-4" />;

							// Basic paragraph rendering
							return (
								<p
									key={i}
									className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
								>
									{line}
								</p>
							);
						})}
					</div>
				</div>

				<aside className="hidden lg:block space-y-8">
					<div
						className={`p-6 border transition-colors rounded-xl ${isDev ? "bg-black text-[var(--accent)] border-[var(--accent)]/30 mono" : "bg-gray-50 dark:bg-[#111] dark:border-[#222]"}`}
					>
						<h4 className="text-xs font-black uppercase mb-4 tracking-widest text-gray-500">
							Article Meta
						</h4>
						<div className="space-y-4 text-xs">
							<div className="flex justify-between">
								<span className="text-gray-500 uppercase">Status</span>
								<span className="font-bold dark:text-white">LIVE_ENTRY</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500 uppercase">Tags</span>
								<span className="font-bold dark:text-white">
									{post.data.tags.length}
								</span>
							</div>
						</div>
					</div>
					{tableOfContents.length > 0 && (
						<div
							className={`sticky top-32 p-6 border transition-all rounded-xl ${isDev ? "bg-black border-[var(--accent)]/30 mono" : "bg-gray-50 dark:bg-[#111] dark:border-[#222]"}`}
						>
							<h4 className="text-[10px] font-black uppercase mb-6 tracking-widest text-gray-500 flex items-center gap-2">
								<List size={12} /> On This Page
							</h4>
							<nav className="space-y-4">
								{tableOfContents.map((item, idx) => (
									<button
										key={idx}
										onClick={() => scrollToId(item.id)}
										className={`block text-left text-xs transition-all border-l-2 pl-3 ${activeId === item.id ? (isDev ? "text-[var(--accent)] border-[var(--accent)] font-black" : "text-blue-600 border-blue-600 font-black") : "text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"} ${item.level === 1 ? "uppercase" : "ml-2"}`}
									>
										{item.text}
									</button>
								))}
							</nav>
						</div>
					)}
					{isDev && (
						<div className="flex justify-center p-8 border border-[var(--accent)]/20 bg-black/40 rounded-3xl backdrop-blur-sm">
							<CoffeeReaction
								level={reactionLevel}
								totalCount={totalClicks}
								onClick={handleReaction}
								isDev={isDev}
							/>
						</div>
					)}
				</aside>
			</div>
		</article>
	);
};
