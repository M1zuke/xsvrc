import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../thunk/dispatch';
import { getUser } from './getUser';
import { getWorld } from './getWorld';
import { info } from './info';
import { login } from './login';

export type API = {
  info(): Promise<void>;
  login(username?: string, password?: string): Promise<void>;
  getWorld(worldId: string): Promise<void>;
  getUser(userId: string): Promise<void>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return useMemo<API>(
    () => ({
      info: async (): Promise<void> => {
        return dispatch(info());
      },
      login: async (username?: string, password?: string) => {
        return dispatch(login(username, password, username && password ? history : undefined));
      },
      getWorld: async (worldId: string) => {
        return dispatch(getWorld(worldId));
      },
      getUser: async (userId: string) => {
        return dispatch(getUser(userId));
      },
    }),
    [dispatch, history],
  );
}
