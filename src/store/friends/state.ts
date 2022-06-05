import { UserInfo } from '../../api/types';
import { Loadable } from '../reducer';

export type FriendEntries = Record<UserInfo['id'], UserInfo>;

export type FriendFilter = {
  showPrivate: boolean;
  showOffline: boolean;
  asList: boolean;
};

export type FriendInfoState = {
  filter: FriendFilter;
  friendInfo: Loadable<FriendEntries>;
  nonFriendInfo: Loadable<FriendEntries>;
};

export const INITIAL_FRIEND_INFO_STATE: FriendInfoState = {
  filter: {
    showPrivate: true,
    showOffline: false,
    asList: false,
  },
  friendInfo: null,
  nonFriendInfo: null,
};
