import { Action } from 'redux';
import { Loadable } from '../reducer';
import { FriendInfo } from './state';

export type FriendsActionType = 'friend/setFriendInfo';

export type FriendAction<T extends FriendsActionType> = Action<T>;

export type SetFriendInfo = FriendAction<'friend/setFriendInfo'> & {
  friendInfo: Loadable<FriendInfo[]>;
};

export type FriendActions = SetFriendInfo;
