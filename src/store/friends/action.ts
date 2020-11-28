import { sortBy } from 'lodash';
import { isLoaded } from '../../api/prepare';
import { CharacterFilter, CharacterFilters } from '../../container/views/friends/Friends';
import { Loadable } from '../reducer';
import { FriendInfo, UserInfo } from './state';
import { SetCachedUser, SetFriendInfo } from './types';

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

export function setFriendInfo(friendInfo: Loadable<FriendInfo[]>, offline?: boolean): SetFriendInfo {
  const sortedFriends = isLoaded(friendInfo) ? sortFriendInfo(friendInfo) : friendInfo;
  return {
    type: 'friend/setFriendInfo',
    friendInfo: sortedFriends,
    offline,
  };
}

export function setCachedUser(id: string, userInfo: Loadable<UserInfo>): SetCachedUser {
  return {
    type: 'friend/setCachedUser',
    id,
    userInfo,
  };
}
