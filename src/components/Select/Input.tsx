import { FC, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

export const Input: FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = props.value;
  }, [props.value]);

  return (
    <div className="w-full rounded bg-zinc-200 flex overflow-hidden items-center dark:bg-zinc-600 gap-2 focus-within:outline focus-within:outline-2 focus-within:outline-emerald-500 outline-none h-full px-2">
      <span>
        <MagnifyingGlassIcon className="h-6 w-6" />
      </span>

      <input
        type="text"
        placeholder={props.placeholder}
        className="bg-transparent w-full h-full focus:outline-none"
        onChange={(e) => props.onChange(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};
