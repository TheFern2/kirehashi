import { useRef, useEffect } from "react";

// https://usehooks.com/usePrevious/
export const usePrevious = (value: any) => {
  const ref = useRef("");

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if selectedLanguage changes

  // return previous value
  return ref.current;
};
