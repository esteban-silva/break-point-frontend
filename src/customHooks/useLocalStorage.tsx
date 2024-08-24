import { Dispatch, useEffect, useState } from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) return JSON.parse(item);
      if (initialValue instanceof Function) {
        return initialValue();
      }
      return initialValue;
    } catch (error) {
      return undefined;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
