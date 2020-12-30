import { Action } from 'redux';
import { UserInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { FriendEntries } from './state';

export type FriendsActionType =
  | 'friend/setFriendInfo'
  | 'friend/setCachedUser'
  | 'friend/setFriendById'
  | 'friend/reset';

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendEntries>;
};

export type SetFriendById = FriendAction<'friend/setFriendById'> & {
  id: string;
  userInfo: UserInfo;
};

export type ResetFriends = FriendAction<'friend/reset'>;

export type FriendActions = SetFriendInfo | SetFriendById | ResetFriends;
