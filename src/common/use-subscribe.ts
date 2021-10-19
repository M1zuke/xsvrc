import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/user/selectors';

export function useSubscribe<T extends string>(
  func: (params: T) => void,
  params: T | null | undefined,
  timeInSeconds = 30,
): void {
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    if (params !== null && loggedIn) {
      const interval = setInterval(() => {
        func(params as T);
      }, timeInSeconds * 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [func, loggedIn, params, timeInSeconds]);
}
