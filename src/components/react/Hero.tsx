import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { mode } from "../../store";

export const Hero = () => {
	const currentMode = useStore(mode);
	const isDev = currentMode === "dev";

	const [uptime, setUptime] = useState(0);
	const [latency, setLatency] = useState(12);
	const [systemStatus, setSystemStatus] = useState<"STABLE" | "WARNING" | "ERROR">("STABLE");

	useEffect(() => {
		if (!isDev) return;

		// Try to get existing status from session storage to keep it stable per session
		const savedStatus = sessionStorage.getItem("api_gateway_status") as "STABLE" | "WARNING" | "ERROR" | null;
		
		if (savedStatus) {
			setSystemStatus(savedStatus);
			sessionStorage.removeItem("api_gateway_status");
		} else {
			const statuses: ("STABLE" | "WARNING" | "ERROR")[] = ["STABLE", "STABLE", "STABLE", "WARNING", "ERROR"];
			const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
			const latencyBase = newStatus === "STABLE" ? 5 : newStatus === "WARNING" ? 200 : 500;
			setSystemStatus(newStatus);
			setLatency(latencyBase);
		}


		const startTime = Date.now();
		const interval = setInterval(() => {
			setUptime(Math.floor((Date.now() - startTime) / 1000));
		}, 1000);

		return () => clearInterval(interval);
	}, [isDev]);

	const formatUptime = (seconds: number) => {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
	};

	return (
		<>
			<section
				className={`min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden text-left`}
			>
				{isDev && (
					<div
						className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"
						style={{
							backgroundImage:
								"radial-gradient(circle, #333 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
				)}
				<div className="max-w-7xl mx-auto w-full relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{isDev && (
							<div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#222] rounded-full mb-8">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
								</span>
								<span className="text-[10px] mono text-gray-500 uppercase">
									STATUS: ARCHITECTING_DISTRIBUTED_LAYERS
								</span>
							</div>
						)}
						<h1
							className={`text-6xl md:text-[8rem] font-black mb-6 tracking-tight leading-[0.9] text-gray-900 dark:text-white uppercase ${!isDev && "normal-case tracking-normal md:text-[6rem]"}`}
						>
							{isDev ? (
								<>
									Systems_ <br />{" "}
									<span className="text-[var(--accent)]">Architecture</span>{" "}
									<br /> Applied_
								</>
							) : (
								<>
									High Performance <br />{" "}
									<span className="text-blue-600">Fullstack</span> <br />{" "}
									Engineering
								</>
							)}
						</h1>
						<p className="max-w-2xl text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-light">
							{isDev
								? "I build robust distributed backends and the high-performance interfaces that reveal them."
								: "Senior Full-stack Engineer specializing in event-driven systems, pixel-perfect UIs, and reliable cloud-native architectures."}
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								href="/#work"
								className={`px-10 py-5 font-black flex items-center gap-3 transition-all uppercase text-sm ${isDev ? "bg-[var(--accent)] text-black mono" : "bg-blue-600 text-white"}`}
							>
								View Projects <ArrowRight size={18} />
							</a>
							<a
								href="/resume"
								className={`px-10 py-5 font-black flex items-center gap-3 transition-all uppercase text-sm border-2 ${isDev ? "border-gray-200 dark:border-[#222] text-gray-900 dark:text-white mono" : "border-gray-100 dark:border-[#222] text-blue-600"}`}
							>
								Official Resume
							</a>
						</div>
					</motion.div>
				</div>
				<div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
				</div>
			</section>
			{isDev && (
				<>
					<a
						href={systemStatus === "STABLE" ? "#" : "/system-failure"}
						className={`fixed bottom-8 left-8 z-[100] hidden lg:flex items-center gap-3 px-4 py-2 border backdrop-blur-md mono text-[10px] font-bold transition-all rounded ${
							systemStatus === "STABLE"
								? "bg-black/80 border-[#222] text-[var(--accent)] cursor-default"
								: systemStatus === "WARNING"
									? "bg-yellow-500/20 border-yellow-500/50 text-yellow-500 cursor-pointer hover:bg-yellow-500/30"
									: "bg-red-500/20 border-red-500/50 text-red-500 cursor-pointer hover:bg-red-500/30 animate-pulse"
						}`}
					>
						<div
							className={`w-2 h-2 rounded-full animate-pulse ${
								systemStatus === "STABLE"
									? "bg-[var(--accent)]"
									: systemStatus === "WARNING"
										? "bg-yellow-500"
										: "bg-red-500"
							}`}
						/>
						API_GATEWAY: {systemStatus} ({latency + 30}ms)
					</a>
					<div className="absolute bottom-10 right-10 mono text-[10px] dark:opacity-20 opacity-35 hidden lg:block pointer-events-none text-right dark:text-white text-black">
						<div className="flex flex-col gap-0.5">
							<span>SYSTEM_NODE: D-OS/1.4.2</span>
							<span>SESSION_UPTIME: {formatUptime(uptime)}</span>
							<span>LATENCY_RTT: {latency}ms</span>
							<span>LOAD_AVG: 0.14, 0.22, 0.19</span>
							<span>REV: 1.0.0-BETA</span>
							<span className="flex items-center justify-end gap-1">
								LOC: GOIAS_BR
								<motion.span
									animate={{ opacity: [0, 1, 0] }}
									transition={{ repeat: Infinity, duration: 0.8 }}
									className="w-1.5 h-3 bg-[var(--accent)] inline-block"
								/>
							</span>
						</div>
					</div>
				</>
			)}
		</>
	);
};
