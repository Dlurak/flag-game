import { shuffle } from "@/utils/arrays/shuffle";
import { useEffect, useState } from "react";
import { Country } from "@/types/Country";
import { Locale, langs } from "@/constants/countries";

interface UseCountryProps {
  lang: Locale;

  limit?: number;

  onCorrect?: (country: Country) => void;
  onIncorrect?: (country: Country) => void;
  onSkip?: (country: Country) => void;
}

export const useCountries = (props: UseCountryProps) => {
  const [countries, setCountries] = useState(
    Object.entries(langs[props.lang]).slice(0, props.limit ?? Infinity),
  );

  useEffect(() => {
    setCountries(shuffle(countries));
  }, []);

  useEffect(() => {
    setCountries(
      shuffle(
        Object.entries(langs[props.lang]).slice(0, props.limit ?? Infinity),
      ),
    );
  }, [props.lang, props.limit]);

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
