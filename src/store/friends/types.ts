import { Action } from 'redux';
import { UserInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export type FriendsActionType =
  | 'friend/setFriendInfo'
  | 'friend/setCachedUser'
  | 'friend/setFriendById'
  | 'friend/reset'
  | 'friend/set-filter';

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendEntries>;
};

export type SetFriendById = FriendAction<'friend/setFriendById'> & {
  id: string;
  userInfo: UserInfo;
};

export type SetFriendFilter = FriendAction<'friend/set-filter'> & {
  filter: Partial<FriendFilter>;
};

export type ResetFriends = FriendAction<'friend/reset'>;

export type FriendActions = SetFriendInfo | SetFriendById | ResetFriends | SetFriendFilter;
