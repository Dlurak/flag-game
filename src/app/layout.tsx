import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toasts } from "@/components/Layout/Toasts";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Flag learning",
	description: "Learn flags",
};

export default function RootLayout({
	children,
}: Readonly<{
		children: React.ReactNode;
	}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} px-4 bg-white dark:bg-neutral-800 text-black dark:text-white`}
			>
				{children}
				<Toasts />
			</body>
		</html>
	);
}
