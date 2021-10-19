import { useMemo } from 'react';
import { useAppDispatch } from '../thunk/dispatch';
import { getAllFriends } from './friends-api';
import { getUser } from './getUser';
import { getInstance, getWorld } from './getWorld';
import { info } from './info';
import { login } from './login';
import { logout } from './logout';

export type API = {
  info(): Promise<void>;
  login(username?: string, password?: string): Promise<void>;
  logout(): Promise<void>;
  getWorld(worldId: string): Promise<void>;
  getInstance(location: string): Promise<void>;
  getUser(userId: string): Promise<void>;
  getAllFriends(): Promise<void>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();

  return useMemo<API>(
    () => ({
      info: async (): Promise<void> => {
        return dispatch(info());
      },
      login: async (username?: string, password?: string) => {
        return dispatch(login(username, password));
      },
      logout: async () => {
        return dispatch(logout());
      },
      getWorld: async (worldId: string) => {
        return dispatch(getWorld(worldId));
      },
      getInstance: async (location: string) => {
        return dispatch(getInstance(location));
      },
      getUser: async (userId: string) => {
        return dispatch(getUser(userId));
      },
      getAllFriends: async () => {
        return dispatch(getAllFriends());
      },
    }),
    [dispatch],
  );
}
