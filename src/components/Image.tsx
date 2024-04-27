import { ISO31661Entry } from "iso-3166";
import { FC } from "react";

export const CountryImage: FC<{ country: ISO31661Entry }> = ({ country }) => {
	return (
		<div
			className="max-h-full max-w-full h-full w-full"
			style={{
				backgroundImage: `url(https://flagcdn.com/${country.alpha2.toLowerCase()}.svg)`,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}}
		/>
	);
};

