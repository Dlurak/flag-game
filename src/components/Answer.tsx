import { ISO31661Entry, iso31661 } from "iso-3166";
import { type FC, type MouseEvent, ReactNode, useState } from "react";
import Select from "react-select";

interface ButtonProps {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	className?: string;
}

const Button: FC<ButtonProps> = ({
	children,
	onClick,
	className,
	disabled,
}) => {
	return (
		<button
			onClick={(e) => {
				if (onClick) onClick(e);
			}}
			className={`px-3 py-2 rounded disabled:brightness-90 ${className}`}
			disabled={disabled ?? false}
			>
		{children}
		</button>
	);
};

type CountryEventHandler = (country: ISO31661Entry) => void;

interface AnswerProps {
	onCorrect: CountryEventHandler;
	onIncorrect: CountryEventHandler;
	onSkip: CountryEventHandler;
	country: ISO31661Entry;
}

export const Answer: FC<AnswerProps> = ({
	country,
	onIncorrect,
	onCorrect,
	onSkip,
}) => {
	const [userInput, setUserInput] = useState("");

	const options = iso31661.map(({ name }) => ({ value: name, label: name }));

	return (
		<div className="flex gap-4 flex-col md:flex-row w-full md:w-3/4 lg:w-1/2 py-2">
			<Select
				key={`react_select_${country.name}` /*rerender when country changes*/}
				options={options}
			onChange={(e) => {
					if (e) setUserInput(e.value);
				}}
				placeholder="Country"
				className="w-full"
				menuPlacement="top"
			/>
			<div className="flex gap-4">
				<Button onClick={() => onSkip(country)} className="bg-blue-400 w-1/3 md:w-fit">
					Skip
				</Button>
				<Button
					onClick={() => {
						if (userInput === country.name) onCorrect(country);
						else onIncorrect(country);
					}}
					className="bg-green-400 w-3/4 md:w-fit"
					disabled={!userInput}
					>
					Submit
				</Button>
			</div>
		</div>
	);
};
