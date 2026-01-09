import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { SKILLS } from "../../data";
import { mode } from "../../store";

export const TechnicalDNA = () => {
	const currentMode = useStore(mode);
	const isDev = currentMode === "dev";

	const groupedSkills = useMemo(() => {
		return SKILLS.reduce(
			(acc, skill) => {
				const cat = skill.category || "tools";
				if (!acc[cat]) acc[cat] = [];
				acc[cat].push(skill);
				return acc;
			},
			{} as Record<string, typeof SKILLS>,
		);
	}, []);

	const categoryLabels: Record<string, string> = {
		frontend: isDev ? "CORE_FRONTEND" : "Frontend Engineering",
		backend: isDev ? "PRODUCT_BACKEND" : "Backend & Systems",
		architecture: isDev ? "UX_SYSTEMS" : "Architecture & UX",
		devops: isDev ? "DX_AUTOMATION" : "Cloud & DX",
	};

	return (
		<section
			id="about-preview"
			className={`py-24 px-6 border-y border-gray-200 dark:border-[#1A1A1A] transition-colors duration-500 ${isDev ? "bg-gray-50 dark:bg-[#0D0D0D]" : "bg-white dark:bg-[#0A0A0A]"}`}
		>
			<div className="max-w-7xl mx-auto">
				<div className="mb-20">
					{isDev && (
						<div className="text-[var(--accent)] mono mb-4">
							// SKILL_SPECTRUM
						</div>
					)}
					<h2
						className={`text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter ${!isDev && "normal-case tracking-normal"}`}
					>
						{isDev ? "Technical_DNA" : "Core Expertise"}
					</h2>
				</div>
				<div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
					{Object.entries(groupedSkills).map(([category, skills], idx) => (
						<div key={category} className="space-y-6">
							<div className="flex items-center gap-4">
								<span
									className={`text-xs font-black mono ${isDev ? "text-[var(--accent)]" : "text-blue-600"}`}
								>
									{isDev ? `0x0${idx + 1}` : `[${idx + 1}]`}
								</span>
								<h3
									className={`text-md font-black text-gray-900 dark:text-white uppercase tracking-wider ${isDev ? "mono" : "font-sans"}`}
								>
									{categoryLabels[category] || category}
								</h3>
								<div className="flex-1 h-[1px] bg-gray-200 dark:bg-[#222]" />
							</div>
							<div className="grid sm:grid-cols-2 gap-3">
								{skills.map((skill) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0, x: -5 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										className={`group relative flex items-center justify-between p-4 border transition-all duration-300 overflow-hidden ${
											isDev
												? "bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-[#1A1A1A] hover:border-[var(--accent)]"
												: "bg-white dark:bg-[#121212] border-gray-100 dark:border-[#222] shadow-sm hover:shadow-md hover:border-blue-600/30"
										}`}
									>
										<div className="flex items-center gap-4 relative z-10">
											<div
												className={`p-2 transition-colors duration-300 ${isDev ? "bg-gray-50 dark:bg-[#1A1A1A] text-gray-400 group-hover:text-[var(--accent)]" : "bg-gray-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400"}`}
											>
												{skill.icon}
											</div>
											<div>
												<h4
													className={`font-bold text-gray-900 dark:text-white ${isDev ? "mono text-xs" : "font-sans"}`}
												>
													{skill.name}
												</h4>
												{skill.subcategory && (
													<p className="text-[10px] mono text-gray-400 uppercase tracking-tighter">
														{skill.subcategory}
													</p>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
