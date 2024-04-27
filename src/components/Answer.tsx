import { type FC, type MouseEvent, ReactNode, useState } from "react";
import { Select, type Option } from "./Select/Select";
import { Country } from "@/types/Country";
import { useCodeObj } from "@/hooks/useCodeObj";

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
			className={`px-3 py-2 rounded disabled:brightness-90 disabled:cursor-not-allowed ${className}`}
			disabled={disabled ?? false}
		>
			{children}
		</button>
	);
};

type CountryEventHandler = (country: Country) => void;

interface AnswerProps {
	onCorrect: CountryEventHandler;
	onIncorrect: CountryEventHandler;
	onSkip: CountryEventHandler;
	country: Country
}

export const Answer: FC<AnswerProps> = ({
	country,
	onIncorrect,
	onCorrect,
	onSkip,
}) => {
	const [selected, setSelected] = useState<Option | null>(null);
	const codeObj = useCodeObj({
		lang: "en"
	})

	const options = Object.entries(codeObj).map(([name]) => ({ value: name, label: name }))

	const submit = () => {
		if (selected?.value === country[0]) onCorrect(country);
		else onIncorrect(country);

		setSelected(null)
	};

	return (
		<div className="flex gap-4 flex-col md:flex-row w-full md:w-3/4 lg:w-1/2 py-2">
			<Select
				options={options}
				onSubmit={submit}
				onChange={setSelected}
				placeholder="Country"
				value={selected}
			/>
			<div className="flex gap-4">
				<Button
					onClick={() => {
						onSkip(country);
						setSelected(null)
					}}
					className="bg-blue-400 w-1/3 md:w-fit"
				>
					Skip
				</Button>
				<Button
					onClick={submit}
					className="bg-green-400 w-3/4 md:w-fit"
					disabled={!selected}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
