import { Action } from 'redux';
import { UserInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { FriendEntries, FriendFilter } from './state';

export type FriendsActionType = `friend/${'setFriendInfo' | 'reset' | 'set-filter' | 'unfriend'}`;

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendEntries>;
};

export type SetFriendFilter = FriendAction<'friend/set-filter'> & {
  filter: Partial<FriendFilter>;
};

export type RemoveFriend = FriendAction<'friend/unfriend'> & {
  userId: UserInfo['id'];
};

export type ResetFriends = FriendAction<'friend/reset'>;

export type FriendActions = SetFriendInfo | ResetFriends | SetFriendFilter | RemoveFriend;
