import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/user/selectors';

export function useSubscribe<T>(func: (params: T) => void, params: T | null, timeInSeconds = 30): void {
  const loggedIn = useSelector(isLoggedIn);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      if (params !== null && loggedIn) {
        func(params);
      }
    }, timeInSeconds * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [func, loggedIn, params, timeInSeconds]);
}
