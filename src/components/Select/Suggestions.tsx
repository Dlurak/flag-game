import { FC, useEffect } from "react";
import { Option } from "./Select";
import { useCycle } from "@/hooks/cycle";
import { useShortcut } from "@/hooks/keyboardShortcut";

interface SuggestionItemProps {
  option: Option;
  isFocused: boolean;
  onClick: (opt: Option) => void;
  onFocus: () => void;
}

const SuggestionItem: FC<SuggestionItemProps> = (props) => {
  const focusClasses = props.isFocused ? "bg-zinc-300 dark:bg-zinc-700" : "";

  return (
    <button
      className={`py-1 px-2 text-start  ${focusClasses}`}
      key={props.option.label}
      tabIndex={-1}
      onClick={() => {
        props.onClick(props.option);
      }}
      onMouseEnter={() => {
        props.onFocus();
      }}
    >
      {props.option.label}
    </button>
  );
};

interface SuggestionProps {
  show: boolean;
  suggestions: Option[];
  onSelect: (opt: Option) => void;
}

export const Suggestions: FC<SuggestionProps> = (props) => {
  const { count, reset, inc, dec, set } = useCycle({
    start: 0,
    min: 0,
    max: Math.max(props.suggestions.length - 1, 0),
  });

  useShortcut((e) => {
    const { key } = e;
    if (!["ArrowDown", "ArrowUp"].includes(key)) return;
    e.preventDefault();

    switch (key) {
      case "ArrowDown":
        inc();
        break;
      case "ArrowUp":
        dec();
        break;
    }
  }, []);

  useShortcut(
    (e) => {
      if (e.key !== "Enter") return;

      props.onSelect(props.suggestions[count]);
      reset();
    },
    [count, props.suggestions],
  );

  return (
    <div className="pb-4 w-full box-border absolute bottom-10 left-0">
      <div
        className={`${
          props.show ? "flex" : "hidden"
        } w-full h-full bg-zinc-200 dark:bg-zinc-600 rounded flex-col overflow-hidden overflow-y-scroll`}
      >
        {props.suggestions.map((opt, i) => {
          return (
            <SuggestionItem
              key={i}
              isFocused={i === count}
              option={opt}
              onClick={props.onSelect}
              onFocus={() => set(i)}
            />
          );
        })}
      </div>
    </div>
  );
};
