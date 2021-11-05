import { isLoaded } from '../../api/prepare';
import { AuthenticatedUserInfo, UserInfo } from '../../api/types';
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
  (userOrInstance: Loadable<UserInfo> | string) =>
  (state: AppState): (AuthenticatedUserInfo | UserInfo)[] => {
    if (isLoaded(state.friends.friendInfo)) {
      if (typeof userOrInstance === 'string') {
        const loggedInUser = isLoaded(state.user.userInfo)
          ? state.user.userInfo.location === userOrInstance
            ? [state.user.userInfo]
            : []
          : [];

        return [
          ...loggedInUser,
          ...Object.values(state.friends.friendInfo).filter((ui) => ui.location === userOrInstance),
        ];
      }

      if (
        isLoaded(userOrInstance) &&
        userOrInstance.location !== 'private' &&
        userOrInstance.location !== 'offline' &&
        userOrInstance.location !== ''
      ) {
        const loggedInUser = isLoaded(state.user.userInfo)
          ? state.user.userInfo.location === userOrInstance.location
            ? [state.user.userInfo]
            : []
          : [];
        return [
          ...loggedInUser,
          ...Object.values(state.friends.friendInfo).filter((ui) => ui.location === userOrInstance.location),
        ];
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
