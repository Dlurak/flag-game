"use client";
import { useState } from "react";
import { ISO31661Entry } from "iso-3166";
import { useCountries } from "@/hooks/countries";
import { FinishedView, QuestionView } from "@/components/Views";

type Count = Record<string, number>;

export default function Home() {
	const [countryCounts, setCountryCounts] = useState<Count>({});

	const incCounter = (entry: ISO31661Entry) => {
		setCountryCounts((old) => ({
			...old,
			[entry.name]: (old[entry.name] ?? 0) + 1,
		}));
	};

	const { countries, correct, incorrect, skip } = useCountries({
		onCorrect: incCounter,
		onIncorrect: incCounter,
	});

	return (
		<>
			{countries.length >= 1 && (
				<QuestionView
					country={countries[0]}
					onCorrect={correct}
					onIncorrect={incorrect}
					onSkip={skip}
				/>
			)}
			{countries.length === 0 && <FinishedView />}
		</>
	);
}
