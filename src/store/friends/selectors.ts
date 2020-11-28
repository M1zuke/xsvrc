import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendInfoState, UserInfo } from './state';

export const selectFriendInfo = (appState: AppState): FriendInfoState => appState.friends;
export const selectCachedUser = (id: string) => (appState: AppState): Loadable<UserInfo> => {
  const user = appState.friends.cachedUsers[id];
  if (user === 'loading') {
    return 'loading';
  }
  return user ?? null;
};
