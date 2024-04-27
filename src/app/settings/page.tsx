"use client";

import { useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";

const LangSetting = () => {
	const [locale, setLocale] = useLocalStorage("locale", "de");
	const selectRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		if (selectRef.current) selectRef.current.value = locale;
	}, [locale, selectRef.current]);

	return (
		<div className="flex w-full justify-between">
			<span>Language</span>
			<span>
				<select
					className="text-black focus:outline-emerald-600 focus:outline-2 focus:outline px-2 py-1 rounded"
					onChange={(e) => {
						setLocale(e.target.value || "de");
					}}
					value={locale}
					ref={selectRef}
				>
					<option value="de">Deutsch</option>
					<option value="en">English</option>
				</select>
			</span>
		</div>
	);
};

export default function Settings() {
	return (
		<div className="w-full">
			<h2 className="text-3xl leading-relaxed">Language settings</h2>
			<LangSetting />
		</div>
	);
}
