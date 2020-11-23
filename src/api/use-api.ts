import { useMemo } from 'react';
import { useAppDispatch } from '../thunk/dispatch';
import { friends } from './friends';
import { info } from './info';
import { login } from './login';
import { useHistory } from 'react-router-dom';

export type API = {
  info(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  friends(): Promise<void>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return useMemo<API>(
    () => ({
      info: async (): Promise<void> => {
        return dispatch(info());
      },
      login: async (username: string, password: string) => {
        return dispatch(login(username, password, history));
      },
      friends: async () => {
        return dispatch(friends());
      },
    }),
    [dispatch, history],
  );
}
