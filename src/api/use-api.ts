import { useMemo } from 'react';
import { useAppDispatch } from '../thunk/dispatch';

export type API = {
  login(): Promise<boolean>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();

  return useMemo<API>(() => ({
    login: async () => {
      return dispatch();
    },
  }));
}
