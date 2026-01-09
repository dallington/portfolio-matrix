import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export const Error404 = () => (
	<div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center px-6 relative overflow-hidden">
		<div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
		<div className="max-w-2xl w-full text-center relative z-10">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<div className="mono text-accent text-xl mb-4 font-bold flex items-center justify-center gap-2">
					<AlertTriangle size={24} /> 0x404_SEGMENTATION_FAULT
				</div>
				<h1 className="text-8xl md:text-[12rem] font-black text-gray-900 dark:text-white leading-none mb-8 tracking-tighter">
					404_
				</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 mb-12 mono">
					The requested memory address is invalid.
				</p>
				<button
					type="button"
					onClick={() => {
						window.location.href = "/";
					}}
					className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-bold mono hover:gap-5 transition-all"
				>
					REBOOT_SESSION <Home size={18} />
				</button>
			</motion.div>
		</div>
	</div>
);

export default Error404;
