"use client";
import { useState } from "react";
import { useCountries } from "@/hooks/countries";
import { FinishedView, QuestionView } from "@/components/Views";
import { toast } from "react-toastify";
import { Country } from "@/types/Country";

type Count = Record<string, number>;

export default function Home() {
	const [countryCounts, setCountryCounts] = useState<Count>({});

	const incCounter = (entry: Country) => {
		setCountryCounts((old) => ({
			...old,
			[entry[0]]: (old[entry[0]] ?? 0) + 1,
		}));
	};

	const { countries, correct, incorrect, skip } = useCountries({
		limit: 1,
		lang: "en",
		onCorrect: incCounter,
		onIncorrect: incCounter,
	});

	return (
		<>
			<div className="h-[100dvh] overflow-hidden-">
				{countries.length >= 1 && (
					<QuestionView
						country={countries[0]}
						onCorrect={() => {
							toast.success("That was correct")
							correct()
						}}
						onIncorrect={(entry) => {
							toast.error(`That was ${entry[0]}`)
							incorrect()
						}}
						onSkip={skip}
					/>
				)}
				{countries.length === 0 && <FinishedView counts={countryCounts} />}
			</div>
		</>
	);
}
