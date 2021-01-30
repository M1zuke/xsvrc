import { useLayoutEffect } from 'react';

export function useSubscribe<T>(func: (params: T) => void, params: T | null, timeInSeconds = 30): void {
  useLayoutEffect(() => {
    if (params !== null) {
      func(params);
    }
    const interval = setInterval(() => {
      if (params !== null) {
        func(params);
      }
    }, timeInSeconds * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [func, params, timeInSeconds]);
}
