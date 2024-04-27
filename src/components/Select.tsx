import { FC, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { diceCoefficient } from "dice-coefficient";
import { registerShortcuts } from "shork";
import { useClickOutside } from "@reactuses/core";

export interface Option {
	label: string;
	value: string;
}

export interface SelectProps {
	options: Option[];
	onChange: (item: Option | null) => void;
	onSubmit?: (item: Option) => void;
	placeholder: string;
	value: Option | null;
}

export const Select: FC<SelectProps> = (props) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredAndSorted, setFilteredAndSorted] = useState(props.options);

	const [selected, setSelected] = useState<Option | null>(null);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(0);

	const inputRef = useRef<HTMLInputElement>(null);
	const entireSelect = useRef<HTMLDivElement>(null);

	useClickOutside(entireSelect, () => {
		setShowSuggestions(false);
	});

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = searchTerm;
			setSelected(
				props.options.find(({ label }) => label === searchTerm) ?? null,
			);
		}
	}, [searchTerm]);

	useEffect(() => {
		setShowSuggestions(false);
		props.onChange(selected);
	}, [selected]);

	useEffect(() => {
		if (searchTerm === "") setFilteredAndSorted(props.options);

		const sorted = props.options
		.map((opt) => [diceCoefficient(opt.label, searchTerm), opt] as const)
		.sort(([a, _], [b, __]) => b - a)
		.filter(([threshold]) => threshold >= 0.25)
		.map(([_, opt]) => opt);

		setFilteredAndSorted(sorted);
		setShowSuggestions(true);
		setFocusedIndex(0)
	}, [searchTerm]);

	useEffect(() => {
		registerShortcuts([
			{
				keys: ["Escape"],
				action: () => setShowSuggestions(false),
			},
		]);
	}, []);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const { key } = e;
			e.preventDefault();

			if (key === "ArrowDown") {
				setFocusedIndex((old) => {
					if (old === filteredAndSorted.slice(0, 5).length - 1) return 0;
					return old + 1;
				});
			}

			if (key === "ArrowUp") {
				setFocusedIndex((focusedIndex) => {
					if (focusedIndex === 0) return filteredAndSorted.slice(0, 5).length - 1;
					else return focusedIndex - 1;
				});
			}
		};

		window.addEventListener("keyup", handler);

		return () => window.removeEventListener("keyup", handler);
	}, [filteredAndSorted]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const { key } = e;

			if (!(key === "Enter")) return;

			if (showSuggestions && focusedIndex !== null) {
				const focusedItem = filteredAndSorted[focusedIndex];
				if (!focusedItem) return

				setSearchTerm(focusedItem.label);
				return;
			}

			if (selected && !showSuggestions) {
				if (props.onSubmit) props.onSubmit(selected);
				return;
			}
		};

		window.addEventListener("keyup", handler);

		return () => window.removeEventListener("keyup", handler);
	}, [showSuggestions, focusedIndex, filteredAndSorted, selected]);

	useEffect(() => {
		setSelected(props.value)
		setSearchTerm(props.value?.label ?? "")
		setFocusedIndex(0)
	}, [props.value])

	return (
		<div className="w-full relative" ref={entireSelect}>
			<div className="pb-4 w-full box-border absolute bottom-10 left-0">
				<div
					className={`w-full h-full bg-zinc-200 dark:bg-zinc-600 rounded flex-col overflow-hidden ${
showSuggestions ? "flex" : "hidden"
}`}
				>
					{filteredAndSorted.slice(0, 5).map(({ label }, i) => (
						<button
							className={`py-1 px-2 text-start  ${
i === focusedIndex ? "bg-zinc-300 dark:bg-zinc-700" : ""
}`}
							key={label}
							tabIndex={-1}
							onClick={() => {
								setSearchTerm(label);
							}}
							onMouseEnter={() => {
								setFocusedIndex(i);
							}}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			<div className="w-full rounded bg-zinc-200 flex overflow-hidden items-center dark:bg-zinc-600 p-2 gap-2 focus-within:outline focus-within:outline-2 focus-within:outline-emerald-500">
				<span>
					<MagnifyingGlassIcon className="h-6 w-6" />
				</span>

				<input
					type="text"
					placeholder={props.placeholder}
					className="bg-transparent w-full h-full focus:outline-none"
					onChange={(e) => setSearchTerm(e.target.value)}
					ref={inputRef}
				/>
			</div>
		</div>
	);
};
