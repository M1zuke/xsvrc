import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendInfoState } from './state';

export const selectFriendInfo = (appState: AppState): FriendInfoState => appState.friends;
export const selectFriendInfoById = (id: string) => (appState: AppState): Loadable<UserInfo> => {
  if (isLoaded(appState.friends)) {
    return appState.friends[id] ?? null;
  }
  return appState.friends === 'loading' ? 'loading' : null;
};
