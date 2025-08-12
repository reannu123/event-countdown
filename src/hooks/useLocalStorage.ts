import { useEffect, useState } from 'react';

// Custom hook for managing localStorage state
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error saving to localStorage with key "${key}"`);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
