import { diceCoefficient } from "dice-coefficient";
import { useEffect, useState } from "react";

interface NaturalLangListProps<T> {
  total: T[];
  search: string;
  threshold: number;
  predicate: (value: T) => string;
  max: number;
}

export const useNaturalLangList = <T>(props: NaturalLangListProps<T>) => {
  const [list, setList] = useState(props.total);

  useEffect(() => {
    const trimmedSearch = props.search.trim();

    const newList = props.total
      .map((opt) => {
        const coefficient = diceCoefficient(
          props.predicate(opt),
          trimmedSearch,
        );

        return [opt, coefficient] as const;
      })
      .sort(([_, a], [__, b]) => b - a)
      .filter(([_, threshold]) => threshold >= props.threshold)
      .map(([opt, _]) => opt)
      .slice(0, props.max ?? Infinity);

    setList(newList);
  }, [props.search]);

  return list;
};
