import { useEffect, useState } from "react";

interface CycleProps {
  start: number;
  min: number;
  max: number;
}

export const useCycle = (props: CycleProps) => {
  const [max, setMax] = useState(props.max);
  const [min, setMin] = useState(props.min);

  useEffect(() => {
    setMax(props.max);
    setMin(props.min);
  }, [props.max, props.min]);

  const [count, setCount] = useState(props.start);

  useEffect(() => {
    if (count > max) setCount(max);
  }, [count, max]);

  useEffect(() => {
    if (min > count) setCount(min);
  }, [count, min]);

  return {
    count,
    inc() {
      setCount((count) => (count === max ? min : count + 1));
    },
    dec() {
      setCount((count) => (count === min ? max : count - 1));
    },
    reset() {
      setCount(props.start);
    },
    set(num: number) {
      setCount(num);
    },
  };
};
