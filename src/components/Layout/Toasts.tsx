"use client";

import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { usePreferredDark } from "@reactuses/core";

export const Toasts = () => {
	const isDark = usePreferredDark(true);

	return (
		<ToastContainer
			theme={isDark ? "dark" : "light"}
			transition={Slide}
			stacked
		/>
	);
};
