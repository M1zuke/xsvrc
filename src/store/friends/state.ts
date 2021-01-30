import { UserInfo } from '../../api/types';
import { CharacterFilter } from '../../container/views/friends/Friends';
import { Loadable } from '../reducer';

export type FriendEntries = Record<UserInfo['id'], UserInfo>;

export type FriendFilter = {
  showPrivate: boolean;
  showOffline: boolean;
  characterFilter: CharacterFilter;
};

export type FriendInfoState = {
  filter: FriendFilter;
  friendInfo: Loadable<FriendEntries>;
};

export const INITIAL_FRIEND_INFO_STATE: FriendInfoState = {
  filter: {
    showPrivate: true,
    showOffline: false,
    characterFilter: 'ALL',
  },
  friendInfo: null,
};
