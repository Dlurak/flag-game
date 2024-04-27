import { FC, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@reactuses/core";
import { Input } from "./Input";
import { Suggestions } from "./Suggestions";
import { useShortcut } from "@/hooks/keyboardShortcut";
import { useNaturalLangList } from "@/hooks/naturalLangList";

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
  const filteredAndSorted = useNaturalLangList({
    total: props.options,
    search: searchTerm,
    threshold: 0.25,
    predicate: (opt) => opt.label,
    max: 5,
  });

  const [selected, setSelected] = useState<Option | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const entireSelect = useRef<HTMLDivElement>(null);

  useClickOutside(entireSelect, () => {
    setShowSuggestions(false);
  });

  useShortcut((e) => {
    if (e.key !== "Escape") return;

    e.preventDefault();
    setShowSuggestions(false);
  });

  useShortcut(
    (e) => {
      if (e.key === "Enter" && selected && !showSuggestions && props.onSubmit)
        props.onSubmit(selected);
    },
    [selected, showSuggestions],
  );

  useEffect(() => {
    const option = props.options.find(({ label }) => label === searchTerm);
    setSelected(option ?? null);
    setShowSuggestions(true);
  }, [searchTerm]);

  useEffect(() => {
    setShowSuggestions(false);
    props.onChange(selected);
  }, [selected]);

  useEffect(() => {
    setSelected(props.value);
    setSearchTerm(props.value?.label ?? "");
  }, [props.value]);

  return (
    <div className="w-full relative" ref={entireSelect}>
      <Suggestions
        suggestions={filteredAndSorted}
        show={showSuggestions}
        onSelect={(e) => setSearchTerm(e.label)}
      />

      <Input
        placeholder={props.placeholder}
        onChange={(e) => setSearchTerm(e)}
        value={searchTerm}
      />
    </div>
  );
};
