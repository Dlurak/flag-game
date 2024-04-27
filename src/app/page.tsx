"use client";
import { useEffect, useState } from "react";
import { useCountries } from "@/hooks/countries";
import { FinishedView, QuestionView } from "@/components/Views";
import { toast } from "react-toastify";
import { Country } from "@/types/Country";
import { Locale } from "@/constants/countries";
import useLocalStorage from "use-local-storage"
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

type Count = Record<string, number>;

export default function Home() {
	const [countryCounts, setCountryCounts] = useState<Count>({});

	const incCounter = (entry: Country) => {
		setCountryCounts((old) => ({
			...old,
			[entry[0]]: (old[entry[0]] ?? 0) + 1,
		}));
	};

	const [locale] = useLocalStorage<Locale>("locale", "de");
	const [usedLocale, setUsedLocale] = useState<Locale>("de")
	const [validLocale, setValidLocale] = useState(false)

	useEffect(() => {
	setUsedLocale(locale)
		setValidLocale(true)
		}, [])

	const { countries, correct, incorrect, skip } = useCountries({
		lang: usedLocale,
		onCorrect: incCounter,
		onIncorrect: incCounter,
	});

	return (
		<>
			<div className="h-[100dvh] relative">
				<a className="w-8 h-8 fixed top-4 right-4" href="/settings">
					<Cog6ToothIcon />
				</a>
				{countries.length >= 1 && validLocale && (
					<QuestionView
						country={countries[0]}
						onCorrect={() => {
							toast.success("That was correct");
							correct();
						}}
						onIncorrect={(entry) => {
							toast.error(`That was ${entry[0]}`);
							incorrect();
						}}
						onSkip={skip}
						lang={usedLocale}
					/>
				)}
				{countries.length === 0 && (
					<FinishedView counts={countryCounts} lang={usedLocale} />
				)}
			</div>
		</>
	);
}
