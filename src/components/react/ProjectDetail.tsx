import { ChevronLeft, Target } from "lucide-react";
import type React from "react";
import { useMode } from "../../hooks/useMode";
import { useStore } from "@nanostores/react";
import { isFocus } from "@/store";
import { FocusToggle } from "./FocusToggle";
import { motion, AnimatePresence } from "framer-motion";

interface Metric {
	label: string;
	value: string;
}

interface Challenge {
	title: string;
	description: string;
	solution: string;
}

interface ProjectData {
	title: string;
	impact: string;
	tags: string[];
	description: string;
	problem: string;
	approach: string;
	challengesList?: Challenge[];
	metrics: Metric[];
	projectLayout: string;
	codeSnippet?: string;
}

interface ProjectDetailProps {
	project: {
		data: ProjectData;
	};
	children?: React.ReactNode;
}

export const ProjectDetail = ({ project, children }: ProjectDetailProps) => {
	const { isDev } = useMode();
	const $isFocus = useStore(isFocus);
	const {
		title,
		impact,
		tags,
		problem,
		challengesList,
		metrics,
		projectLayout,
		codeSnippet,
	} = project.data;

	const accentColor = isDev ? "text-[var(--accent)]" : "text-blue-600";
	const accentBorder = isDev ? "border-[var(--accent)]" : "border-blue-600";
	const accentBg = isDev
		? "bg-[var(--accent)]/10"
		: "bg-blue-50 dark:bg-blue-900/10";

	return (
		<article className={`pt-32 pb-24 px-6 min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-1000 ${$isFocus ? 'pt-20' : ''}`}>
			<FocusToggle />
			<motion.div layout className={`max-w-6xl mx-auto ${$isFocus ? 'max-w-3xl' : ''}`}>
				{!$isFocus && (
					<a
						href="/"
						className={`flex items-center gap-2 mb-12 font-bold transition-all ${isDev ? "mono text-xs text-[var(--accent)] hover:-translate-x-2" : "font-sans text-blue-600 hover:text-blue-700"}`}
					>
						<ChevronLeft size={16} />{" "}
						{isDev ? "BACK_TO_REPO_LIST" : "Back to Projects"}
					</a>
				)}

				<header className={`transition-all duration-1000 ${$isFocus ? 'mb-20' : 'mb-32'}`}>
					{!$isFocus && (
						<div className="flex flex-wrap gap-2 mb-10">
							{tags.map((tag) => (
								<span
									key={tag}
									className={`text-[10px] px-3 py-1 border uppercase tracking-widest font-black ${isDev ? "mono border-[var(--accent)]/30 text-[var(--accent)]" : "border-gray-200 dark:border-[#333] text-gray-500"}`}
								>
									#{tag}
								</span>
							))}
						</div>
					)}
					<h1
						className={`text-6xl md:text-[8rem] font-black text-gray-900 dark:text-white mb-12 leading-[1.1]  break-all tracking-tight transition-all duration-1000 ${$isFocus ? 'text-5xl md:text-7xl mb-8' : ''} ${isDev ? "mono uppercase" : "font-sans"}`}
					>
						{isDev ? title.toUpperCase().replace(/\s+/g, "_") : title}
					</h1>
					{!$isFocus && (
						<div className={`p-12 border-l-8 ${accentBg} ${accentBorder}`}>
							<p
								className={`text-2xl md:text-5xl font-light italic leading-tight ${accentColor}`}
							>
								"{impact}"
							</p>
						</div>
					)}
				</header>

				<div className={`space-y-40 transition-all duration-700 ${$isFocus ? 'space-y-20' : ''}`}>
					<motion.div layout className={`grid transition-all duration-700 ${$isFocus ? 'grid-cols-1' : 'lg:grid-cols-[1fr_350px] gap-16 items-start'}`}>
						<motion.div
							layout
							className={`prose prose-2xl dark:prose-invert max-w-none transition-all duration-1000 ${$isFocus ? 'prose-xl' : ''} ${isDev ? "font-mono" : "font-sans"}`}
						>
							<p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-12">
								{problem}
							</p>
							{children}
						</motion.div>

						<AnimatePresence mode="popLayout">
							{!$isFocus && (
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
									className={`p-8 border rounded-3xl ${isDev ? "bg-black border-[var(--accent)]/20" : "bg-slate-50 dark:bg-slate-900 border-gray-100 dark:border-[#222]"}`}
									style={{ gridColumn: $isFocus ? 1 : 2, gridRow: 1 }}
								>
									<div
										className={`text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${isDev ? "text-[var(--accent)]" : "text-red-500"}`}
									>
										<Target size={14} />{" "}
										{isDev ? "PERFORMANCE_TELEMETRY" : "Key Metrics"}
									</div>
									<div className="space-y-6">
										{metrics.map((m) => (
											<div
												key={m.label}
												className={`pb-4 last:border-0 border-b ${isDev ? "border-[var(--accent)]/10" : "border-gray-100 dark:border-gray-800"}`}
											>
												<div className="text-[10px] mono text-gray-500 uppercase">
													{m.label}
												</div>
												<div className={`text-3xl font-black ${accentColor}`}>
													{m.value}
												</div>
											</div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					{!$isFocus && challengesList && (
						<section>
							<div className="flex items-center gap-4 mb-8">
								<div
									className={`flex items-center justify-center w-10 h-10 border rounded-full font-bold ${isDev ? "border-[var(--accent)] text-[var(--accent)] mono" : "border-blue-600 text-blue-600 font-sans"}`}
								>
									03
								</div>
								<h2
									className={`text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white ${isDev ? "mono" : "font-sans"}`}
								>
									{isDev ? "ENGINEERING_LOGS" : "Engineering Hurdles"}
								</h2>
							</div>
							<div className="grid md:grid-cols-2 gap-12">
								{challengesList.map((challenge, i) => (
									<div
										key={i}
										className={`p-12 border rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all ${isDev ? "bg-black border-[var(--accent)]/20" : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800"}`}
									>
										<h4
											className={`text-2xl font-black mb-6 dark:text-white ${isDev ? "mono" : "font-sans"}`}
										>
											#{i + 1} {challenge.title}
										</h4>
										<div className="space-y-6">
											<div>
												<span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-2">
													{isDev ? "VARIABLE" : "The Variable"}
												</span>
												<p
													className={`text-gray-600 dark:text-gray-400 leading-relaxed font-light ${isDev ? "mono text-sm" : "font-sans text-lg"}`}
												>
													{challenge.description}
												</p>
											</div>
											<div
												className={`p-6 border-l-4 ${accentBg} ${accentBorder}`}
											>
												<span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-2">
													{isDev ? "SOLUTION_APPLIED" : "The Solution"}
												</span>
												<p
													className={`text-sm italic text-gray-700 dark:text-gray-200 leading-relaxed ${isDev ? "mono" : "font-sans"}`}
												>
													{challenge.solution}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{!$isFocus && projectLayout === "complete" && codeSnippet && (
						<section>
							<div
								className={`p-12 border text-sm overflow-x-auto shadow-2xl relative group rounded-[2rem] ${isDev ? "border-[var(--accent)]/30 bg-black mono" : "bg-gray-950 border-gray-800"}`}
							>
								<div className="absolute top-6 right-8 text-[10px] mono opacity-40 uppercase tracking-widest text-gray-500">
									{isDev ? "SRC_REF_01" : "SOURCE_MODULE"}
								</div>
								<pre className="text-gray-300 leading-relaxed py-4">
									<code>{codeSnippet}</code>
								</pre>
							</div>
						</section>
					)}
				</div>
			</motion.div>
		</article>
	);
};
