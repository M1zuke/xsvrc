import { useEffect, useMemo } from 'react';

export function useSubscribe<T>(func: (params: T) => void, params: T, time = 25000): void {
  useMemo(() => {
    func(params);
  }, [func, params]);
  useEffect(() => {
    const interval = setInterval(() => func(params), time);
    return () => {
      clearInterval(interval);
    };
  }, [func, params, time]);
}
