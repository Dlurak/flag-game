"use client";
import { useState } from "react";
import { ISO31661Entry } from "iso-3166";
import { useCountries } from "@/hooks/countries";

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
			<div>
				<div className="flex items-center justify-center">
					<img
						src={`https://flagcdn.com/${countries[0].alpha2.toLowerCase()}.svg`}
						className="h-1/2 object-fit"
						alt={countries[0].name}
						key={countries[0].name}
					/>
				</div>

				<div>
					<button onClick={correct}>Correct</button>
					<button onClick={incorrect}>Incorrect</button>
					<button onClick={skip}>Skip</button>
				</div>
			</div>
		</>
	);
}
