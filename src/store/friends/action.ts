import { sortBy } from 'lodash';
import { ifLoaded } from '../../api/prepare';
import { CharacterFilter, CharacterFilters } from '../../container/views/friends/Friends';
import { Loadable } from '../reducer';
import { FriendInfo } from './state';
import { SetFriendInfo } from './types';

function sortFriendInfo(friendInfo: FriendInfo[]): FriendInfo[] {
  const specialCharacterFriendInfo = friendInfo.filter(
    (o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
  );
  const cleanFriendInfo = friendInfo.filter((o) =>
    CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
  );

  return [
    ...sortBy(specialCharacterFriendInfo, (o) => o.displayName[0].toLowerCase()),
    ...sortBy(cleanFriendInfo, (o) => o.displayName[0].toLowerCase()),
  ];
}

export function setFriendInfo(friendInfo: Loadable<FriendInfo[]>): SetFriendInfo {
  const sortedFriends = ifLoaded(friendInfo) ? sortFriendInfo(friendInfo) : friendInfo;
  return {
    type: 'friend/setFriendInfo',
    friendInfo: sortedFriends,
  };
}
