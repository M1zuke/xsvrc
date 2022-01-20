import { isLoaded } from '../../api/prepare';
import { AuthenticatedUserInfo, UserInfo } from '../../api/types';
import { isOnline } from '../../common/utils';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export const selectFriendInfo = (appState: AppState): Loadable<FriendEntries> => appState.friends.friendInfo;

const selectUserIfIdMatches =
  (id: string) =>
  (state: AppState): AuthenticatedUserInfo | null => {
    if (isLoaded(state.user.userInfo) && state.user.userInfo.id === id) {
      return state.user.userInfo;
    }
    return null;
  };

const selectFromFriendsById =
  (id: string) =>
  (state: AppState): UserInfo | null => {
    if (isLoaded(state.friends.friendInfo)) {
      return state.friends.friendInfo[id] || null;
    }
    return null;
  };

const selectFromNonFriendsById =
  (id: string) =>
  (state: AppState): UserInfo | null => {
    if (isLoaded(state.friends.nonFriendInfo)) {
      return state.friends.nonFriendInfo[id] || null;
    }
    return null;
  };

export const selectFriendInfoById =
  (id: string) =>
  (appState: AppState): Loadable<UserInfo> => {
    const userInfo = selectUserIfIdMatches(id)(appState);
    const friendInfo = selectFromFriendsById(id)(appState);
    const nonFriendInfo = selectFromNonFriendsById(id)(appState);

    if (userInfo) {
      return userInfo;
    }

    if (friendInfo) {
      return friendInfo;
    }

    if (nonFriendInfo) {
      return nonFriendInfo;
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

      if (isLoaded(userOrInstance) && userOrInstance.location !== 'private' && isOnline(userOrInstance)) {
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

export const GetFriends = (state: AppState): UserInfo[] =>
  isLoaded(state.friends.friendInfo) ? Object.values(state.friends.friendInfo) : [];
