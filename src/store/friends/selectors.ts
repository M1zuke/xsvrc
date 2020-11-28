import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendsState, UserInfo } from './state';

export const selectFriendInfo = (appState: AppState): FriendsState => appState.friends.friends;
export const selectCachedUser = (id: string) => (appState: AppState): Loadable<UserInfo> =>
  appState.friends.cachedUsers[id] ?? null;
