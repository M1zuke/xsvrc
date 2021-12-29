import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/user/selectors';

export function useSubscribe<T extends string>(
  func: (params: T) => void,
  params: T | null | undefined,
  timeInSeconds = 30,
  dontPrefetch?: boolean,
): void {
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    if (params !== null && loggedIn) {
      !dontPrefetch && func(params as T);
      const interval = setInterval(() => {
        func(params as T);
      }, timeInSeconds * 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [dontPrefetch, func, loggedIn, params, timeInSeconds]);
}
