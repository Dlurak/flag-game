import { ISO31661Entry } from "iso-3166";
import { FC } from "react";

export const CountryImage: FC<{ country: ISO31661Entry }> = ({ country }) => {
	return (
		<img
			src={`https://flagcdn.com/${country.alpha2.toLowerCase()}.svg`}
			className="max-h-full max-w-full h-full object-contain w-auto"
			alt={country.name}
			key={country.name}
		/>
	);
};
