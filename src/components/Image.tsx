import { Country } from "@/types/Country";
import { FC } from "react";

export const CountryImage: FC<{ country: Country }> = ({ country }) => {
	return (
		<div
			className="max-h-full max-w-full h-full w-full"
			style={{
				backgroundImage: `url(https://flagcdn.com/${country[1].toLowerCase()}.svg)`,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}}
		/>
	);
};

