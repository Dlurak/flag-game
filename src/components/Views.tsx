import { FC, ReactNode, useState } from "react";
import { CountryImage } from "./Image";
import { Answer } from "./Answer";
import Image from "next/image"
import { Country } from "@/types/Country";
import { useCodeObj } from "@/hooks/useCodeObj";
import { CountryName } from "@/constants/countries";

interface QuestionProps {
	country: Country
	onCorrect: (country: Country) => void;
	onIncorrect: (country: Country) => void;
	onSkip: (country: Country) => void;
}

export const QuestionView: FC<QuestionProps> = ({
	country,
	onCorrect,
	onIncorrect,
	onSkip,
}) => {
	return (
		<div className="h-full grid grid-rows-[3fr,1fr]">
			<div className="flex items-center justify-center h-full">
				<div className="w-full md:w-3/4 h-5/6 flex items-center justify-center">
					<CountryImage country={country} />
				</div>
			</div>

			<div className="h-full flex items-center justify-center">
				<Answer
					country={country}
					onCorrect={onCorrect}
					onIncorrect={onIncorrect}
					onSkip={onSkip}
				/>
			</div>
		</div>
	);
};

interface FinishedProps {
	counts: Record<string, number>;
}

const Cell: FC<{ isHead?: boolean; children: ReactNode }> = (props) => {
	if (props.isHead) return <th className="border px-2">{props.children}</th>;

	return <td className="border px-2 py-1">{props.children}</td>;
};

export const FinishedView: FC<FinishedProps> = ({ counts }) => {
	const entries = Object.entries(counts);
	const sortedEntries = entries.sort(([_, a], [__, b]) => b - a);
	const countries = useCodeObj({
		lang: "en"
	})

	const [displayedEntries, setDisplayedEntries] = useState(sortedEntries);
	const reverse = () => setDisplayedEntries((old) => old.toReversed());

	return (
		<>
			<table className="overflow-x-auto">
				<thead>
					<tr>
						<Cell isHead>Flag</Cell>
						<Cell isHead>Country</Cell>
						<Cell isHead>
						<button onClick={reverse}>
								<span className="flex gap-2">
									<span>
										Count
									</span>
									<span>
										⇅
									</span>
								</span>
							</button>	
						</Cell>
					</tr>
				</thead>
				<tbody>
					{displayedEntries.map(([country, count]) => {
						const code = countries[country as CountryName]
						const flagUrl = `https://flagcdn.com/${code.toLowerCase()}.svg`

						return (
							<tr key={`${country}-${count}`}>
								<Cell>
									<Image
										src={flagUrl}
										height="100"
										width="100"
										alt={`Flag of ${country}`}
									/>
								</Cell>
								<Cell>{country}</Cell>
								<Cell>{count}</Cell>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
