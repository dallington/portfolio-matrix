import { useStore } from "@nanostores/react";
import {
	motion,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";
import { useEffect, useState } from "react";
import { mode } from "../../store";

export const CustomCursor = () => {
	const currentMode = useStore(mode);
	const isDev = currentMode === "dev";

	const [hovering, setHovering] = useState(false);
	const { scrollYProgress } = useScroll();

	// High-performance tracking
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	// Velocity tracking for distortion effects
	const velocityX = useVelocity(cursorX);
	const velocityY = useVelocity(cursorY);

	// Snappier spring configuration
	const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
	const springX = useSpring(cursorX, springConfig);
	const springY = useSpring(cursorY, springConfig);

	// Map velocity to skew and scale for a "fluid" effect
	const skewX = useTransform(velocityX, [-2000, 2000], [-30, 30]);
	const skewY = useTransform(velocityY, [-2000, 2000], [-30, 30]);

	// Scroll Progress Ring math
	const radius = 12;
	const circumference = 2 * Math.PI * radius;
	// HOOKS MUST BE BEFORE ANY RETURNS
	const dashOffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

	// Coordinate labels as motion values
	const xLabel = useTransform(cursorX, (v) => `X:${Math.round(v)}`);
	const yLabel = useTransform(cursorY, (v) => `Y:${Math.round(v)}`);

	useEffect(() => {
		if (!isDev) return;

		const move = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const over = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.closest("a") ||
				target.closest("button") ||
				(target instanceof HTMLElement && target.style.cursor === "pointer")
			) {
				setHovering(true);
			} else {
				setHovering(false);
			}
		};

		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", over);

		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", over);
		};
	}, [cursorX, cursorY, isDev]);

	// If not dev mode, we return null, but ALL hooks above have been initialized in a consistent order
	if (!isDev) return null;

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
			style={{
				x: springX,
				y: springY,
				translateX: "-50%",
				translateY: "-50%",
			}}
		>
			{/* Scroll Progress Ring */}
			<svg
				width="40"
				height="40"
				className="absolute -top-5 -left-5 -rotate-90"
			>
				<circle
					cx="20"
					cy="20"
					r={radius}
					fill="none"
					stroke="rgba(0, 255, 136, 0.1)"
					strokeWidth="1"
				/>
				<motion.circle
					cx="20"
					cy="20"
					r={radius}
					fill="none"
					stroke="var(--accent)"
					strokeWidth="1.5"
					strokeDasharray={circumference}
					style={{ strokeDashoffset: dashOffset }}
					strokeLinecap="round"
				/>
			</svg>

			{/* Main Cursor Core */}
			<motion.div
				className="custom-cursor !relative !top-0 !left-0"
				style={{
					scale: hovering ? 2.5 : 1,
					opacity: hovering ? 0.4 : 1,
					skewX,
					skewY,
					backgroundColor: "var(--accent)",
				}}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			/>

			{/* Technical coordinate label */}
			<motion.div
				className="absolute left-6 top-0 mono text-[8px] text-[var(--accent)] font-bold whitespace-nowrap opacity-50"
				style={{ opacity: hovering ? 0 : 0.5 }}
			>
				<motion.span>{xLabel}</motion.span>
				<span className="mx-1">/</span>
				<motion.span>{yLabel}</motion.span>
			</motion.div>
		</motion.div>
	);
};
