import { useStore } from "@nanostores/react";
import { mode, toggleMode } from "../store";

export const useMode = () => {
	const currentMode = useStore(mode);
	const isDev = currentMode === "dev";

	return {
		mode: currentMode,
		isDev,
		toggleMode,
	};
};
