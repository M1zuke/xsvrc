import { AppState } from '../index';
import { Loadable } from '../reducer';
import { FriendInfo } from './state';

export const friendInfo = (appState: AppState): Loadable<FriendInfo[]> => appState.friends;
