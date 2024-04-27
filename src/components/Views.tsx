import { ISO31661Entry } from "iso-3166";
import { FC } from "react";
import { CountryImage } from "./Image";
import { Answer } from "./Answer";

interface QuestionProps {
	country: ISO31661Entry;
	onCorrect: (country: ISO31661Entry) => void;
	onIncorrect: (country: ISO31661Entry) => void;
	onSkip: (country: ISO31661Entry) => void;
}

export const QuestionView: FC<QuestionProps> = ({
	country,
	onCorrect,
	onIncorrect,
	onSkip,
}) => {
	return (
		<div className="h-screen grid grid-rows-[3fr,1fr]">
			<div className="flex items-center justify-center h-full ">
				<div className="w-3/4 h-3/4 flex items-center justify-center">
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

export const FinishedView = () => {
	return null;
};
