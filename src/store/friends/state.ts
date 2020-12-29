import { UserInfo } from '../../api/types';
import { Loadable } from '../reducer';

export type FriendEntries = Record<UserInfo['id'], UserInfo>;

export type FriendInfoState = Loadable<FriendEntries>;

export const INITIAL_FRIEND_INFO_STATE: FriendInfoState = null;
