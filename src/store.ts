import { atom } from "nanostores";

export type Mode = "dev" | "recruiter";

// Helper to get initial mode safely
const getInitialMode = (): Mode => {
	if (typeof localStorage !== "undefined") {
		const saved = localStorage.getItem("app_mode"); // Using app_mode to avoid generic conflicts
		if (saved === "dev" || saved === "recruiter") return saved;
	}
	return "dev";
};

export const mode = atom<Mode>(getInitialMode());
export const isPaletteOpen = atom(false);
export const isFocus = atom(false);

export const toggleMode = () => {
	const current = mode.get();
	const next = current === "dev" ? "recruiter" : "dev";
	mode.set(next);
	if (typeof localStorage !== "undefined") {
		localStorage.setItem("app_mode", next);
	}
};

export const toggleFocus = () => {
	isFocus.set(!isFocus.get());
};

export const setPaletteOpen = (isOpen: boolean) => {
	isPaletteOpen.set(isOpen);
};
