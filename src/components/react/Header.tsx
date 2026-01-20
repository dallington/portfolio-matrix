import { Menu, Monitor, Moon, Search, Sun, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMode } from "../../hooks/useMode";
import { isFocus, setPaletteOpen } from "../../store";
import { useStore } from "@nanostores/react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
	const [isDark, setIsDark] = useState(true);
	const [mounted, setMounted] = useState(false);
	const { isDev, toggleMode } = useMode();
	const $isFocus = useStore(isFocus);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
		setMounted(true);
	}, []);

	const effectiveIsDev = mounted ? isDev : true;

	const toggleTheme = () => {
		const nextValue = !isDark;
		setIsDark(nextValue);
		if (nextValue) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<AnimatePresence>
			{!$isFocus && (
				<motion.header
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					exit={{ y: -100 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ${effectiveIsDev ? "border-gray-200 dark:border-[#1A1A1A] bg-white/80 dark:bg-[#0A0A0A]/80" : "border-gray-100 dark:border-[#1A1A1A] bg-white/95 dark:bg-[#0A0A0A]/95"} backdrop-blur-md px-6 py-4`}
				>
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<a
					href="/"
					className="flex items-center gap-2 cursor-pointer z-50 relative"
				>
					<div
						className={`w-10 h-10 rounded-sm p-1 flex items-center justify-center font-bold text-black transition-colors ${effectiveIsDev ? "bg-[var(--accent)] mono" : "bg-blue-600 text-white font-sans"}`}
					>
						<svg width="35" height="15" viewBox="0 0 35 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M33.3656 6.97375L22.2523 1.13913V2.4309C22.2521 2.57599 22.2917 2.71836 22.3668 2.84249C22.4419 2.96662 22.5497 3.06776 22.6783 3.13488L32.1285 7.97391V8.02631L23.0588 12.6534L18.1172 2.81593C18.0548 2.68721 17.9578 2.57837 17.8372 2.50153C17.7165 2.4247 17.5768 2.38289 17.4338 2.38078C17.3989 2.37844 17.3639 2.37844 17.329 2.38078C17.2948 2.37844 17.2606 2.37844 17.2264 2.38078C17.0833 2.38263 16.9436 2.42433 16.8228 2.50119C16.7021 2.57806 16.6052 2.68705 16.543 2.81593L11.5878 12.6534L2.51573 8.01491V7.97391L11.9659 3.12805C12.0949 3.06133 12.2029 2.96028 12.2781 2.83606C12.3533 2.71184 12.3927 2.56926 12.392 2.42407V1.13913L1.27863 6.97375C1.09538 7.07245 0.942261 7.21891 0.835535 7.39761C0.728808 7.57631 0.672455 7.78057 0.672455 7.98871C0.672455 8.19686 0.728808 8.40112 0.835535 8.57982C0.942261 8.75852 1.09538 8.90498 1.27863 9.00368L11.2665 14.2437C11.4194 14.325 11.5957 14.3508 11.7655 14.3166V14.353C11.9722 14.3518 12.1745 14.2933 12.3499 14.1839C12.5253 14.0744 12.6668 13.9185 12.7588 13.7333L17.3153 4.69549L21.8718 13.7333C21.965 13.9204 22.1088 14.0776 22.2867 14.1871C22.4647 14.2966 22.6698 14.3541 22.8788 14.353V14.3371C23.0478 14.3714 23.2235 14.3456 23.3755 14.2642L33.3634 9.02418C33.5472 8.92602 33.701 8.77974 33.8082 8.60097C33.9154 8.42221 33.9721 8.21767 33.9721 8.00922C33.9721 7.80077 33.9154 7.59623 33.8082 7.41746C33.701 7.2387 33.5472 7.09242 33.3634 6.99425L33.3656 6.97375Z" fill="black"/>
							<path d="M11.2096 14.9112C11.0367 14.875 10.8695 14.8152 10.7129 14.7335L0.961949 9.60742C0.671204 9.44999 0.428357 9.21699 0.259044 8.933C0.0897309 8.64901 0.000233788 8.32458 4.57411e-07 7.99395C-0.000232873 7.66332 0.0888062 7.33876 0.257718 7.05454C0.42663 6.77031 0.669149 6.53696 0.959671 6.37913L13.0755 0V2.42407C13.077 2.69517 13.0033 2.96137 12.8625 3.19306C12.7217 3.42474 12.5194 3.61281 12.2781 3.73634L3.96697 7.98758L11.287 11.733L15.9187 2.50608C16.0376 2.26244 16.2226 2.05716 16.4527 1.91373C16.6827 1.7703 16.9485 1.69451 17.2196 1.69502H17.3221H17.4269C17.6984 1.69408 17.9647 1.76967 18.1952 1.91313C18.4257 2.05658 18.611 2.26209 18.7301 2.50608L23.3595 11.733L30.6796 7.98758L22.3685 3.73634C22.1269 3.61292 21.9243 3.42493 21.7831 3.19327C21.6419 2.96161 21.5677 2.69535 21.5688 2.42407V0L33.6846 6.37913C33.9787 6.53527 34.2247 6.76855 34.3963 7.05392C34.5679 7.33929 34.6585 7.66599 34.6585 7.99897C34.6585 8.33195 34.5679 8.65865 34.3963 8.94402C34.2247 9.22939 33.9787 9.46266 33.6846 9.61881L23.9314 14.7449C23.7757 14.8269 23.6093 14.8867 23.437 14.9226L23.2661 14.9568C22.9078 15.0362 22.5339 15.0057 22.1932 14.8691C21.8526 14.7325 21.5611 14.4963 21.3569 14.1913C21.3269 14.1427 21.2995 14.0925 21.2749 14.0409L17.3221 6.20142L13.3716 14.0295C13.3463 14.0811 13.3181 14.1313 13.2873 14.1799C13.0833 14.4844 12.7922 14.7204 12.452 14.857C12.1119 14.9935 11.7384 15.0243 11.3804 14.9454L11.2096 14.9112ZM22.6533 13.5921L23.0132 13.6559C23.0208 13.6591 23.0289 13.6607 23.0371 13.6607C23.0454 13.6607 23.0535 13.6591 23.0611 13.6559L33.0489 8.41589C33.1231 8.37643 33.1849 8.31725 33.2275 8.24488C33.2701 8.17251 33.2919 8.08977 33.2904 8.0058C33.2919 7.92183 33.2701 7.83909 33.2275 7.76672C33.1849 7.69436 33.1231 7.63518 33.0489 7.59572L22.9358 2.26231V2.42407C22.9356 2.44343 22.9406 2.46249 22.9502 2.4793C22.9598 2.49611 22.9737 2.51007 22.9904 2.51975L32.812 7.53192V8.42956L22.7558 13.5761L17.5158 3.12349C17.5092 3.10727 17.4983 3.09316 17.4842 3.08272C17.4701 3.07227 17.4535 3.06589 17.436 3.06426L17.3449 3.07565H17.2424C17.2238 3.073 17.2049 3.07646 17.1885 3.0855C17.172 3.09454 17.159 3.10867 17.1513 3.12577L11.8885 13.5761L1.83224 8.42956V7.54104L11.6561 2.52887C11.6726 2.51908 11.6862 2.50503 11.6954 2.4882C11.7046 2.47136 11.7091 2.45236 11.7085 2.43318V2.26231L1.59758 7.57749C1.52345 7.61695 1.46166 7.67613 1.41904 7.7485C1.37643 7.82087 1.35464 7.9036 1.35609 7.98758C1.35464 8.07155 1.37643 8.15429 1.41904 8.22665C1.46166 8.29902 1.52345 8.3582 1.59758 8.39766L11.5855 13.6377C11.6002 13.6431 11.6163 13.6431 11.631 13.6377L12.0069 13.5625C12.0676 13.5196 12.1169 13.4625 12.1505 13.3962L17.3221 3.144L22.4938 13.3962C22.5274 13.4752 22.5827 13.5431 22.6533 13.5921Z" fill="black"/>
						</svg>

					</div>
					<span
						className={`font-bold tracking-tighter hidden sm:block text-gray-900 dark:text-white ${effectiveIsDev ? "mono" : "font-sans tracking-normal"}`}
					>
						{effectiveIsDev ? "DALLINGTON_" : "Dallington"}
					</span>
				</a>

				<div className="flex items-center gap-4 md:gap-8 z-50 relative">
					<nav
						className={`hidden md:flex gap-6 text-sm font-medium ${effectiveIsDev ? "mono text-gray-600 dark:text-gray-400" : "font-sans text-gray-500"}`}
					>
						<a
							href="/projects"
							className={`hover:text-[var(--accent)] transition-colors ${!effectiveIsDev && "hover:text-blue-600"}`}
						>
							WORK
						</a>
						<a
							href="/labs"
							className={`hover:text-[var(--accent)] transition-colors ${!effectiveIsDev && "hover:text-blue-600"}`}
						>
							LAB
						</a>
						<a
							href="/resume"
							className={`hover:text-[var(--accent)] transition-colors ${!effectiveIsDev && "hover:text-blue-600"}`}
						>
							RESUME
						</a>
						<a
							href="/about"
							className={`hover:text-[var(--accent)] transition-colors ${!effectiveIsDev && "hover:text-blue-600"}`}
						>
							ABOUT
						</a>
						<a
							href="/blog"
							className={`hover:text-[var(--accent)] transition-colors ${!effectiveIsDev && "hover:text-blue-600"}`}
						>
							BLOG
						</a>
					</nav>

					<div className="flex items-center gap-2 border-l border-gray-200 dark:border-[#222] pl-4 md:pl-8">
						<button
							onClick={() => setPaletteOpen(true)}
							className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
								effectiveIsDev
									? "border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/10"
									: "border-gray-200 dark:border-[#333] text-gray-400 hover:text-gray-900 dark:hover:text-white"
							}`}
						>
							<Search size={14} />
							<span className="mono">CMD+K</span>
						</button>

						<button
							onClick={toggleMode}
							className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${effectiveIsDev ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20" : "bg-blue-600 text-white"}`}
							title={effectiveIsDev ? "Switch to Recruiter Mode" : "Switch to Dev Mode"}
						>
							{effectiveIsDev ? <Monitor size={14} /> : <User size={14} />}
							<span className="inline">
								{effectiveIsDev ? "DEV_MODE_ON" : "RECRUITER"}
							</span>
						</button>

						<button
							onClick={toggleTheme}
							className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
							aria-label="Toggle Theme"
						>
							{isDark ? <Sun size={18} /> : <Moon size={18} />}
						</button>

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden p-2 text-gray-900 dark:text-white"
							aria-label="Toggle Menu"
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-white dark:bg-[#0A0A0A] transition-transform duration-300 ease-in-out md:hidden z-40 flex flex-col items-center justify-center ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ top: "0px", height: "100vh", paddingTop: "80px" }}
			>
				<nav
					className={`flex flex-col items-center gap-8 text-2xl font-bold ${effectiveIsDev ? "mono" : "font-sans"}`}
				>
					<a
						href="/#work"
						onClick={() => setIsMenuOpen(false)}
						className={`hover:text-[var(--accent)] transition-colors text-gray-900 dark:text-white ${!effectiveIsDev && "hover:text-blue-600"}`}
					>
						WORK
					</a>
					<a
						href="/labs"
						onClick={() => setIsMenuOpen(false)}
						className={`hover:text-[var(--accent)] transition-colors text-gray-900 dark:text-white ${!effectiveIsDev && "hover:text-blue-600"}`}
					>
						LAB
					</a>
					<a
						href="/resume"
						onClick={() => setIsMenuOpen(false)}
						className={`hover:text-[var(--accent)] transition-colors text-gray-900 dark:text-white ${!effectiveIsDev && "hover:text-blue-600"}`}
					>
						RESUME
					</a>
					<a
						href="/about"
						onClick={() => setIsMenuOpen(false)}
						className={`hover:text-[var(--accent)] transition-colors text-gray-900 dark:text-white ${!effectiveIsDev && "hover:text-blue-600"}`}
					>
						ABOUT
					</a>
					<a
						href="/blog"
						onClick={() => setIsMenuOpen(false)}
						className={`hover:text-[var(--accent)] transition-colors text-gray-900 dark:text-white ${!effectiveIsDev && "hover:text-blue-600"}`}
					>
						BLOG
					</a>
				</nav>
			</div>
				</motion.header>
			)}
		</AnimatePresence>
	);
};
