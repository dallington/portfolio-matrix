import { useStore } from "@nanostores/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { isFocus, toggleFocus } from "@/store";

export const FocusToggle = () => {
	const $isFocus = useStore(isFocus);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key.toLowerCase() === "z" &&
				!["input", "textarea"].includes(
					(e.target as HTMLElement).tagName.toLowerCase(),
				)
			) {
				toggleFocus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		
		// Show the button after a small delay
		const timer = setTimeout(() => setIsVisible(true), 1000);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			clearTimeout(timer);
		};
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className="fixed bottom-8 right-8 z-[100]"
				>
					<button
						onClick={toggleFocus}
						className={`group flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 ${
							$isFocus
								? "bg-[var(--accent)] border-[var(--accent)] text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]"
								: "bg-black/80 border-white/10 text-white/50 hover:text-white hover:border-white/20"
						}`}
						title="Toggle Focus Mode (Press 'Z')"
					>
						<span className="mono text-[10px] font-black tracking-widest overflow-hidden transition-all duration-500 max-w-0 group-hover:max-w-[100px] whitespace-nowrap">
							{$isFocus ? "EXIT FOCUS" : "ENTER FOCUS"}
						</span>
						{$isFocus ? (
							<Wind size={16} className="animate-pulse" />
						) : (
							<Eye size={16} />
						)}
						<span className={`mono text-[8px] border rounded px-1 ml-1 ${$isFocus ? 'opacity-80 border-black' : 'opacity-30 border-white/20'}`}>
							Z
						</span>
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
