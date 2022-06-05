import { useMemo } from 'react';
import { BoundThunkAction } from '../thunk';
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
import { changeUsername } from './user-api';
import { usernameExits } from './utils-api';

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
  usernameExits: BoundThunkAction<typeof usernameExits>;
  changeUsername: BoundThunkAction<typeof changeUsername>;
};

export function useApi(): API {
  const dispatch = useAppDispatch();

  return useMemo<API>(
    () => ({
      info: async () => {
        await dispatch(info());
      },
      login: async (username?: string, password?: string) => {
        await dispatch(login(username, password));
      },
      logout: async () => {
        await dispatch(logout());
      },
      getWorld: async (location) => {
        await dispatch(getWorld(location));
      },
      getInstance: async (location) => {
        await dispatch(getInstance(location));
      },
      getUser: async (userId) => {
        await dispatch(getUser(userId));
      },
      getAllFriends: async () => {
        await dispatch(getAllFriends());
      },
      unfriendUser: async (id) => {
        await dispatch(sendUnfriendRequest(id));
      },
      addToFavorites: async (user, group) => {
        await dispatch(addToFavorites(user, group));
      },
      removeFromFavorites: async (favorite) => {
        await dispatch(removeFromFavorites(favorite));
      },
      getAllModerations: async () => {
        await dispatch(getAllModerations());
      },
      selfInvite: async (location) => {
        await dispatch(selfInvite(location));
      },
      getAllAvatars: async () => {
        await dispatch(getAllAvatars());
      },
      updateAvatar: async (avatarInfo, changeVersion) => {
        await dispatch(updateAvatar(avatarInfo, changeVersion));
      },
      getAvatar: async (avatarInfo) => {
        await dispatch(getAvatar(avatarInfo));
      },
      deleteAvatar: async (avatarId: AvatarInfo['id']) => {
        await dispatch(deleteAvatar(avatarId));
      },
      handleNotification: async (notificationId, method) => {
        await dispatch(handleNotification(notificationId, method));
      },
      moderateUser: async (userId, type) => {
        await dispatch(moderateUser(userId, type));
      },
      unModerateUser: async (userId, type) => {
        await dispatch(unModerateUser(userId, type));
      },
      getTransactions: async () => {
        await dispatch(getTransactions());
      },
      usernameExits: async (userId, displayName) => {
        return dispatch(usernameExits(userId, displayName));
      },
      changeUsername: async (userId, displayName, password) => {
        return dispatch(changeUsername(userId, displayName, password));
      },
    }),
    [dispatch],
  );
}
