import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export const selectFriendInfo = (appState: AppState): Loadable<FriendEntries> => appState.friends.friendInfo;
export const selectFriendInfoById = (id: string) => (appState: AppState): Loadable<UserInfo> => {
  if (isLoaded(appState.friends.friendInfo)) {
    return appState.friends.friendInfo[id] ?? null;
  }
  return appState.friends.friendInfo === 'loading' ? 'loading' : null;
};
export const selectFriendInfoByLocation = (location: string) => (appState: AppState): UserInfo[] => {
  if (isLoaded(appState.friends.friendInfo) && location !== 'private' && location !== 'offline') {
    return Object.values(appState.friends.friendInfo).filter((ui) => ui.location === location);
  }
  return [];
};

export const selectFriendFilter = (state: AppState): FriendFilter => state.friends.filter;
