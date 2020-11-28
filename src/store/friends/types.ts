import { Action } from 'redux';
import { Loadable } from '../reducer';
import { FriendInfo, UserInfo } from './state';

export type FriendsActionType = 'friend/setFriendInfo' | 'friend/setCachedUser';

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendInfo[]>;
  offline?: boolean;
};

export type SetCachedUser = FriendAction<'friend/setCachedUser'> & {
  id: string;
  userInfo: Loadable<UserInfo>;
};

export type FriendActions = SetFriendInfo | SetCachedUser;
