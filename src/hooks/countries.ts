import { shuffle } from "@/utils/arrays/shuffle";
import { ISO31661Entry, iso31661 } from "iso-3166";
import { useEffect, useState } from "react";

interface UseCountryProps {
  limit?: number;

  onCorrect?: (country: ISO31661Entry) => void;
  onIncorrect?: (country: ISO31661Entry) => void;
  onSkip?: (country: ISO31661Entry) => void;
}

export const useCountries = (props: UseCountryProps) => {
  const [countries, setCountries] = useState(
    iso31661.slice(0, props.limit ?? Infinity),
  );

  useEffect(() => {
    setCountries(shuffle(countries));
  }, []);

  return {
    correct() {
      if (props.onCorrect) props.onCorrect(countries[0]);
      setCountries(countries.slice(1));
    },
    incorrect() {
      const first = countries[0];
      if (props.onIncorrect) props.onIncorrect(first);

      setCountries([...countries.slice(1), first]);
    },
    skip() {
      const first = countries[0];
      if (props.onSkip) props.onSkip(first);

      setCountries([...countries.slice(1), first]);
    },
    countries,
  };
};
