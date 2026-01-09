import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	Briefcase,
	FileText,
	FlaskConical,
	Info,
	Mail,
	Monitor,
	Search,
	Terminal,
	User,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { isPaletteOpen, mode, setPaletteOpen, toggleMode } from "../../store";
import type { BlogPost, Lab, Project } from "../../types";

interface CommandItem {
	id: string;
	title: string;
	category: string;
	icon: React.ReactNode;
	action: () => void;
}

interface CommandPaletteProps {
	projects: Project[];
	posts: BlogPost[];
	labs: Lab[];
}

export const CommandPalette = ({
	projects,
	posts,
	labs,
}: CommandPaletteProps) => {
	const currentMode = useStore(mode);
	const isOpen = useStore(isPaletteOpen);
	const isDev = currentMode === "dev";

	const [search, setSearch] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Define available commands
	const commands = useMemo(() => {
		const items: CommandItem[] = [
			{
				id: "nav-home",
				title: "Go to Home",
				category: "Navigation",
				icon: <Monitor size={16} />,
				action: () => (window.location.href = "/"),
			},
			{
				id: "nav-about",
				title: "About the Engineer",
				category: "Navigation",
				icon: <Info size={16} />,
				action: () => (window.location.href = "/about"),
			},
			{
				id: "nav-resume",
				title: "View Professional Resume",
				category: "Navigation",
				icon: <FileText size={16} />,
				action: () => (window.location.href = "/resume"),
			},
			{
				id: "nav-lab",
				title: "System Design Labs",
				category: "Navigation",
				icon: <FlaskConical size={16} />,
				action: () => (window.location.href = "/labs"),
			},
			{
				id: "nav-blog",
				title: "View Engineering Blog",
				category: "Navigation",
				icon: <FileText size={16} />,
				action: () => (window.location.href = "/blog"),
			},
			{
				id: "action-toggle-mode",
				title: isDev ? "Switch to Recruiter Mode" : "Switch to Developer Mode",
				category: "Actions",
				icon: isDev ? <User size={16} /> : <Terminal size={16} />,
				action: toggleMode,
			},
			{
				id: "contact",
				title: "Get in Touch",
				category: "Navigation",
				icon: <Mail size={16} />,
				action: () => {
					window.location.href = "/#contact";
				},
			},
		];

		// Add Projects
		projects.forEach((p) => {
			items.push({
				id: `project-${p.id}`,
				title: `Project: ${p.title}`,
				category: "Projects",
				icon: <Briefcase size={16} />,
				action: () => (window.location.href = `/projects/${p.id}`),
			});
		});

		// Add Labs
		labs.forEach((l) => {
			items.push({
				id: `lab-${l.id}`,
				title: `Lab: ${l.title}`,
				category: "Labs",
				icon: <FlaskConical size={16} />,
				action: () => (window.location.href = `/labs/${l.id}`),
			});
		});

		// Add Posts
		posts.forEach((p) => {
			items.push({
				id: `post-${p.id}`,
				title: `Post: ${p.title}`,
				category: "Articles",
				icon: <FileText size={16} />,
				action: () => (window.location.href = `/blog/${p.id}`),
			});
		});

		return items;
	}, [isDev, projects, posts, labs]);

	const filteredCommands = useMemo(() => {
		if (!search) return commands;
		const s = search.toLowerCase();
		return commands.filter(
			(c) =>
				c.title.toLowerCase().includes(s) ||
				c.category.toLowerCase().includes(s),
		);
	}, [search, commands]);

	useEffect(() => {
		if (isOpen) {
			setSearch("");
			setSelectedIndex(0);
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [isOpen]);

	const onClose = () => setPaletteOpen(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setPaletteOpen(!isOpen);
			}

			if (!isOpen) return;

			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex(
					(prev) =>
						(prev - 1 + filteredCommands.length) % filteredCommands.length,
				);
			} else if (e.key === "Enter") {
				e.preventDefault();
				if (filteredCommands[selectedIndex]) {
					filteredCommands[selectedIndex].action();
					onClose();
				}
			} else if (e.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, filteredCommands, selectedIndex, onClose]);

	// Handle clicking outside to close
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
					/>
					<div className="fixed inset-0 z-[201] flex items-start justify-center pt-[15vh] px-4">
						<motion.div
							ref={containerRef}
							initial={{ opacity: 0, scale: 0.95, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -20 }}
							className={`w-full max-w-2xl overflow-hidden border shadow-2xl ${
								isDev
									? "bg-[#0D0D0D] border-[var(--accent)]/30 mono"
									: "bg-white dark:bg-[#121212] border-gray-200 dark:border-[#222] rounded-xl font-sans"
							}`}
						>
							<div className="relative flex items-center px-4 py-4 border-b border-gray-200 dark:border-[#222]">
								<Search
									className={`mr-4 ${isDev ? "text-[var(--accent)]" : "text-blue-600"}`}
									size={20}
								/>
								<input
									ref={inputRef}
									type="text"
									placeholder={
										isDev ? "COMMAND_QUERY..." : "Type a command or search..."
									}
									className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 text-lg"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										setSelectedIndex(0);
									}}
								/>
								<div className="flex items-center gap-1">
									<span className="px-2 py-0.5 text-[10px] border border-gray-200 dark:border-[#333] rounded mono text-gray-500">
										ESC
									</span>
								</div>
							</div>

							<div className="max-h-[60vh] overflow-y-auto py-2">
								{filteredCommands.length > 0 ? (
									Object.entries(
										filteredCommands.reduce(
											(acc, cmd) => {
												if (!acc[cmd.category]) acc[cmd.category] = [];
												acc[cmd.category].push(cmd);
												return acc;
											},
											{} as Record<string, CommandItem[]>,
										),
									).map(([category, items]) => (
										<div key={category}>
											<div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
												{isDev ? `// ${category}` : category}
											</div>
											{items.map((item) => {
												const globalIndex = filteredCommands.indexOf(item);
												const isSelected = globalIndex === selectedIndex;
												return (
													<div
														key={item.id}
														onMouseEnter={() => setSelectedIndex(globalIndex)}
														onClick={() => {
															item.action();
															onClose();
														}}
														className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
															isSelected
																? isDev
																	? "bg-[var(--accent)] text-black"
																	: "bg-blue-600 text-white"
																: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
														}`}
													>
														<div className="flex items-center gap-3">
															{item.icon}
															<span className="text-sm font-bold uppercase tracking-tight">
																{item.title}
															</span>
														</div>
														{isSelected && (
															<div className="flex items-center gap-1 opacity-60">
																<span className="text-[10px] mono">ENTER</span>
																<ArrowRight size={12} />
															</div>
														)}
													</div>
												);
											})}
										</div>
									))
								) : (
									<div className="px-4 py-12 text-center text-gray-500 mono text-xs uppercase tracking-widest">
										404_COMMAND_NOT_FOUND
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
};
