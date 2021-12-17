import { Action } from 'redux';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export type FriendsActionType = `friend/${'setFriendInfo' | 'reset' | 'set-filter' | 'set-non-friend'}`;

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendEntries>;
};

export type SetFriendFilter = FriendAction<'friend/set-filter'> & {
  filter: Partial<FriendFilter>;
};

export type SetNonFriendInfo = FriendAction<'friend/set-non-friend'> & {
  userInfo: Loadable<FriendEntries>;
};

export type ResetFriends = FriendAction<'friend/reset'>;

export type FriendActions = SetFriendInfo | ResetFriends | SetFriendFilter | SetNonFriendInfo;
