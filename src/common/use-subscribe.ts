import { useLayoutEffect } from 'react';

export function useSubscribe<T>(func: (params: T) => void, params: T | null, time = 30000): void {
  useLayoutEffect(() => {
    if (params !== null) {
      func(params);
    }
    const interval = setInterval(() => {
      if (params !== null) {
        func(params);
      }
    }, time);
    return () => {
      clearInterval(interval);
    };
  }, [func, params, time]);
}
