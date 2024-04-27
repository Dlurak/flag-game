import { DependencyList, useEffect } from "react";

export const useShortcut = (
  callback: (e: KeyboardEvent) => void,
	dependencies: DependencyList = []
) => {
  useEffect(() => {
    window.addEventListener("keyup", callback);
    return () => window.removeEventListener("keyup", callback);
  }, dependencies);
};
