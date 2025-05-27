import { useEffect, useCallback } from 'react';

interface useDebounceProps {
  effect: () => void;
  dependencies: any[];
  delay: number;
}

export default function useDebounce({effect, dependencies, delay}:useDebounceProps) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}