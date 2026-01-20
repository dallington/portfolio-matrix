import { atom } from "nanostores";
import { getCookie, setCookie } from "./utils/cookies";

export type Mode = "dev" | "recruiter";

// Helper to get initial mode safely
const getInitialMode = (): Mode => {
	if (typeof document !== "undefined") {
		const saved = getCookie("app_mode");
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
	setCookie("app_mode", next);
};

export const toggleFocus = () => {
	isFocus.set(!isFocus.get());
};

export const setPaletteOpen = (isOpen: boolean) => {
	isPaletteOpen.set(isOpen);
};
