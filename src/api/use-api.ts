import { useMemo } from 'react';
import { useAppDispatch } from '../thunk/dispatch';
import { addToFavorites, removeFromFavorites } from './favorites-api';
import { getAllFriends, sendUnfriendRequest } from './friends-api';
import { getUser } from './getUser';
import { getInstance, getWorld } from './getWorld';
import { info } from './info';
import { login } from './login';
import { logout } from './logout';
import { getAllModerations } from './moderations';
import { Favorite, FriendFavoriteGroup, NamedFavorite, UserInfo } from './types';

export type API = {
  info(): Promise<void>;
  login(username?: string, password?: string): Promise<void>;
  logout(): Promise<void>;
  getWorld(worldId: string): Promise<void>;
  getInstance(location: string): Promise<void>;
  getUser(userId: string): Promise<void>;
  getAllFriends(): Promise<void>;
  unfriendUser(id: string): Promise<void>;
  addToFavorites(user: UserInfo, group: FriendFavoriteGroup): Promise<void>;
  removeFromFavorites(favorite: Favorite | NamedFavorite): Promise<void>;
  getAllModerations(): Promise<void>;
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
      getWorld: async (worldId) => {
        return dispatch(getWorld(worldId));
      },
      getInstance: async (location) => {
        return dispatch(getInstance(location));
      },
      getUser: async (userId) => {
        return dispatch(getUser(userId));
      },
      getAllFriends: async () => {
        return dispatch(getAllFriends());
      },
      unfriendUser: (id) => {
        return dispatch(sendUnfriendRequest(id));
      },
      addToFavorites: (user, group) => {
        return dispatch(addToFavorites(user, group));
      },
      removeFromFavorites: (favorite) => {
        return dispatch(removeFromFavorites(favorite));
      },
      getAllModerations: () => {
        return dispatch(getAllModerations());
      },
    }),
    [dispatch],
  );
}
