import { useEffect, useRef } from 'react';

export function useAutoSave<T>(
  key: string,
  data: T,
  enabled: boolean = true
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, data, enabled]);

  const clearSaved = () => {
    localStorage.removeItem(key);
  };

  const getSaved = (): T | null => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  };

  return { clearSaved, getSaved };
}
