import { useMemo } from 'react';
import { UserInfo } from '../store/friends/state';
import { Loadable } from '../store/reducer';
import { useAppDispatch } from '../thunk/dispatch';
import { getFriends } from './getFriends';
import { getUser } from './getUser';
import { info } from './info';
import { login } from './login';
import { useHistory } from 'react-router-dom';

export type API = {
  info(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  friends(offline?: boolean): Promise<void>;
  getUser(id: string): Promise<Loadable<UserInfo>>;
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
      friends: async (offline?: boolean) => {
        return dispatch(getFriends(offline));
      },
      getUser: async (id: string) => {
        return dispatch(getUser(id));
      },
    }),
    [dispatch, history],
  );
}
