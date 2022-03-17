import { useMemo } from 'react';
import { useAppDispatch } from '../thunk/dispatch';
import { deleteAvatar, getAllAvatars, getAvatar, updateAvatar } from './avatars-api';
import { addToFavorites, removeFromFavorites } from './favorites-api';
import { getAllFriends, sendUnfriendRequest } from './friends-api';
import { getUser } from './getUser';
import { info } from './info';
import { getInstance, getWorld, selfInvite } from './instance-api';
import { login } from './login';
import { logout } from './logout';
import { getAllModerations, moderateUser, unModerateUser } from './moderations';
import { handleNotification, NotificationsAnswerPossibility } from './notifications-api';
import { getTransactions } from './transactions';
import { AvatarInfo, Favorite, ModerationType, NamedFavorite, NotificationContent, UserInfo } from './types';

export type API = {
  info(): Promise<void>;
  login(username?: string, password?: string): Promise<void>;
  logout(): Promise<void>;
  getWorld(location: string): Promise<void>;
  getInstance(location: string): Promise<void>;
  getUser(userId: string): Promise<void>;
  getAllFriends(): Promise<void>;
  unfriendUser(id: string): Promise<void>;
  addToFavorites(user: UserInfo, group: string): Promise<void>;
  removeFromFavorites(favorite: Favorite | NamedFavorite): Promise<void>;
  getAllModerations(): Promise<void>;
  selfInvite(location: string): Promise<void>;
  getAllAvatars(): Promise<void>;
  updateAvatar(avatarInfo: AvatarInfo, changeVersion?: boolean): Promise<void>;
  deleteAvatar(avatarId: string): Promise<void>;
  getAvatar(avatarId: string): Promise<void>;
  handleNotification(notificationId: NotificationContent, method: NotificationsAnswerPossibility): Promise<void>;
  moderateUser(userId: UserInfo['id'], type: ModerationType): Promise<void>;
  unModerateUser(userId: UserInfo['id'], type: ModerationType): Promise<void>;
  getTransactions(): Promise<void>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();

  return useMemo<API>(
    () => ({
      info: (): Promise<void> => {
        return dispatch(info());
      },
      login: (username?: string, password?: string) => {
        return dispatch(login(username, password));
      },
      logout: () => {
        return dispatch(logout());
      },
      getWorld: (location) => {
        return dispatch(getWorld(location));
      },
      getInstance: (location) => {
        return dispatch(getInstance(location));
      },
      getUser: (userId) => {
        return dispatch(getUser(userId));
      },
      getAllFriends: () => {
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
      selfInvite: (location) => {
        return dispatch(selfInvite(location));
      },
      getAllAvatars: () => {
        return dispatch(getAllAvatars());
      },
      updateAvatar: (avatarInfo, changeVersion) => {
        return dispatch(updateAvatar(avatarInfo, changeVersion));
      },
      getAvatar: (avatarInfo) => {
        return dispatch(getAvatar(avatarInfo));
      },
      deleteAvatar: (avatarId: AvatarInfo['id']) => {
        return dispatch(deleteAvatar(avatarId));
      },
      handleNotification: (notificationId, method) => {
        return dispatch(handleNotification(notificationId, method));
      },
      moderateUser: (userId, type) => {
        return dispatch(moderateUser(userId, type));
      },
      unModerateUser: (userId, type) => {
        return dispatch(unModerateUser(userId, type));
      },
      getTransactions: () => {
        return dispatch(getTransactions());
      },
    }),
    [dispatch],
  );
}
