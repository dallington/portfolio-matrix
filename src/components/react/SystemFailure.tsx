import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOG_MESSAGES = [
	"CRITICAL: API Gateway connection timeout (504)",
	"INFO: Re-establishing TLS handshake with edge nodes...",
	"WARN: Redis cluster health: DEGRADED (4/5 nodes alive)",
	"DEBUG: Inspecting orphan processes in high-memory pods...",
	"INFO: Migrating traffic to secondary AWS-East-1 region...",
	"DEBUG: Verifying JWT signing keys rotation...",
	"INFO: Rebuilding distributed cache layers...",
	"WARN: High IO wait detected on primary PostgreSQL instance",
	"INFO: Running sanity checks on microservices health endpoints...",
	"DEBUG: Investigating race condition in transaction coordinator...",
	"INFO: Attempting circuit breaker reset (Attempt #4)...",
	"SUCCESS: Secondary database sync complete. Data integrity verified.",
];

const SUCCESS_LOGS = [
	"SUCCESS: All API services nominal.",
	"SUCCESS: Gateway latency reduced to <15ms.",
	"SUCCESS: Connection pools restored and balanced.",
	"INFO: Standing by for traffic burst...",
	"SUCCESS: Infrastructure patch applied successfully across all regions.",
];

export const SystemFailure = () => {
	const [logs, setLogs] = useState<string[]>([]);
	const [glitch, setGlitch] = useState(false);
	const [isResolved, setIsResolved] = useState(false);

	useEffect(() => {
		const logInterval = setInterval(() => {
			setLogs((prev) => {
				const source = isResolved ? SUCCESS_LOGS : LOG_MESSAGES;
				const next = [...prev, source[Math.floor(Math.random() * source.length)]];
				return next.slice(-15);
			});
		}, 600);

		const glitchInterval = setInterval(() => {
			if (isResolved) return;
			setGlitch(true);
			setTimeout(() => setGlitch(false), 150);
		}, 5000);

		// Resolution timer
		const randomTime = Math.floor(Math.random() * (10 - 6 + 1) + 6) * 1000;
		
		const resolutionTimer = setTimeout(() => {
			setIsResolved(true);
			sessionStorage.setItem("api_gateway_status", "STABLE");
		}, randomTime);

		return () => {
			clearInterval(logInterval);
			clearInterval(glitchInterval);
			clearTimeout(resolutionTimer);
		};
	}, [isResolved]);

	const themeColor = isResolved ? "text-emerald-500" : "text-amber-500";
	const borderColor = isResolved ? "border-emerald-900/30" : "border-amber-900/30";
	const bgColor = isResolved ? "bg-emerald-950/5" : "bg-amber-950/5";
	const accentColor = isResolved ? "bg-emerald-500" : "bg-amber-500";

	return (
		<div className={`min-h-screen transition-colors duration-1000 ${isResolved ? 'bg-[#050A05]' : 'bg-[#0A0A0A]'} ${themeColor}/90 p-8 mono flex flex-col items-center justify-center relative overflow-hidden`}>
			{/* Subtle Glitch Overlay */}
			{glitch && !isResolved && (
				<div className="absolute inset-0 bg-blue-500/5 mix-blend-screen pointer-events-none" />
			)}

			<div className={`z-10 w-full max-w-4xl border ${borderColor} ${bgColor} p-8 relative backdrop-blur-sm transition-all duration-1000`}>
				{!isResolved && (
					<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent animate-scanline" />
				)}
				
				<div className={`flex justify-between items-center mb-10 border-b ${isResolved ? 'border-emerald-900/20' : 'border-amber-900/20'} pb-4`}>
					<div className="flex items-center gap-3">
						<div className={`w-2 h-2 rounded-full ${accentColor} ${!isResolved && 'animate-pulse'}`} />
						<h1 className="text-xl font-bold tracking-tight opacity-80 text-white">
							{isResolved ? "INFRASTRUCTURE_NOMINAL" : "EMERGENCY_API_MAINTENANCE_IN_PROGRESS"}
						</h1>
					</div>
					<span className="text-[10px] opacity-40">
						{isResolved ? "STATUS: OPERATIONAL" : "INCIDENT_ID: #API-ERR-402"}
					</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
					<div className="lg:col-span-3 flex flex-col gap-6">
						<div className="text-5xl font-black text-white leading-tight">
							{isResolved ? (
								<>
									Systems <br />
									<span className={themeColor}>Restored.</span>
								</>
							) : (
								<>
									Keep Calm. <br />
									<span className={themeColor}>API failing.</span>
								</>
							)}
						</div>
						<p className="text-sm opacity-60 leading-relaxed max-w-md dark:text-gray-400 text-gray-600">
							{isResolved 
								? "The API Gateway and all microservices are back online. Connection pools have been balanced, and high-performance routing is re-established. Total stability achieved."
								: "One of our server clusters experienced an unexpected failure. I'm currently orchestrating a failover to a healthy region and re-syncing the distributed cache. Stand by."
							}
						</p>
						
						<div className="mt-6 flex flex-wrap gap-4">
							<a 
								href="/" 
								className={`px-8 py-4 ${accentColor} text-black font-bold uppercase text-xs hover:opacity-80 transition-all transform hover:-translate-y-0.5 active:translate-y-0`}
							>
								{isResolved ? "Back to Portfolio" : "Return to Base"}
							</a>
							{!isResolved && (
								<button 
									onClick={() => window.location.reload()}
									className={`px-8 py-4 border ${isResolved ? 'border-emerald-500/30' : 'border-amber-500/30'} ${themeColor} font-bold uppercase text-xs hover:bg-white/5 transition-all`}
								>
									Re-calibrate (Refresh)
								</button>
							)}
						</div>
					</div>

					<div className="lg:col-span-2 bg-black/40 p-6 rounded-lg border border-white/5 h-[320px] overflow-hidden font-mono text-[10px] leading-relaxed flex flex-col-reverse shadow-inner">
						{logs.map((log, i) => (
							<div key={i} className="mb-2 opacity-80 hover:opacity-100 transition-opacity">
								<span className={`${isResolved ? 'text-emerald-900/60' : 'text-amber-900/60'} mr-2`}>[{new Date().toLocaleTimeString()}]</span> 
								<span className={
									log.startsWith('WARN') ? 'text-orange-400' : 
									log.startsWith('DEBUG') ? 'text-blue-400/70' : 
									log.startsWith('SUCCESS') ? 'text-emerald-400' : ''
								}>
									{log}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Background Ambience */}
			<div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden text-white">
				<div className={`absolute inset-0 ${isResolved ? 'bg-[radial-gradient(#10b981_1px,transparent_1px)]' : 'bg-[radial-gradient(#d97706_1px,transparent_1px)]'} [background-size:32px_32px] transition-all duration-1000`} />
			</div>
		</div>
	);
};
