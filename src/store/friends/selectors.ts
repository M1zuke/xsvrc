import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export const selectFriendInfo = (appState: AppState): Loadable<FriendEntries> => appState.friends.friendInfo;
export const selectFriendInfoById =
  (id: string) =>
  (appState: AppState): Loadable<UserInfo> => {
    if (isLoaded(appState.user.userInfo) && appState.user.userInfo.id === id) {
      return appState.user.userInfo;
    }

    if (isLoaded(appState.friends.friendInfo)) {
      return appState.friends.friendInfo[id] ?? null;
    }
    return appState.friends.friendInfo === 'loading' ? 'loading' : null;
  };
export const selectFriendInfoByLocation =
  (user: Loadable<UserInfo> | string) =>
  (appState: AppState): UserInfo[] => {
    if (isLoaded(appState.friends.friendInfo)) {
      if (typeof user === 'string') {
        return Object.values(appState.friends.friendInfo).filter((ui) => ui.location === user);
      }

      if (isLoaded(user) && user.location !== 'private' && user.location !== 'offline' && user.location !== '') {
        return Object.values(appState.friends.friendInfo).filter((ui) => ui.location === user.location);
      }
    }
    return [];
  };

export const selectFriendFilter = (state: AppState): FriendFilter => state.friends.filter;
export const IsLoggedInUser =
  (id: string) =>
  (state: AppState): boolean => {
    return isLoaded(state.user.userInfo) ? state.user.userInfo.id === id : false;
  };
