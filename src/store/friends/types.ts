import { Action } from 'redux';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export type FriendsActionType = `friend/${'setFriendInfo' | 'reset' | 'set-filter'}`;

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendEntries>;
};

export type SetFriendFilter = FriendAction<'friend/set-filter'> & {
  filter: Partial<FriendFilter>;
};

export type ResetFriends = FriendAction<'friend/reset'>;

export type FriendActions = SetFriendInfo | ResetFriends | SetFriendFilter;
