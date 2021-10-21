import { isLoaded } from '../../api/prepare';
import { isFriendNotification, isNotification, UserInfo, WebSocketNotification } from '../../api/types';
import { handleUserActiveOrUpdateNotification } from '../../components/websockets/logics/active-update-online';
import { handleUserAddNotification } from '../../components/websockets/logics/add';
import { handleUserDeleteNotification } from '../../components/websockets/logics/delete';
import { handleUserLocationNotification } from '../../components/websockets/logics/location';
import { handleUserOfflineNotification } from '../../components/websockets/logics/offline';
import { CharacterFilter, CharacterFilters } from '../../container/views/friends/Friends';
import { AppThunkAction } from '../../thunk';
import { Loadable } from '../reducer';
import { addNotification } from '../user/actions';
import { FriendEntries, FriendFilter } from './state';
import { ResetFriends, SetFriendFilter, SetFriendInfo } from './types';

function compare<T extends keyof UserInfo, V = UserInfo[T]>(a: V, b: V): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, 'en');
  }

  return 0;
}

function sortFunction(a: UserInfo, b: UserInfo): number {
  return compare(a.displayName.toLowerCase(), b.displayName.toLowerCase());
}

function sortFriendInfo(friendInfo: UserInfo[]): UserInfo[] {
  const specialCharacterFriendInfo = friendInfo.filter(
    (o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
  );
  const cleanFriendInfo = friendInfo.filter((o) =>
    CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
  );

  return [...specialCharacterFriendInfo.sort(sortFunction), ...cleanFriendInfo.sort(sortFunction)];
}

export function resetFriends(): ResetFriends {
  return {
    type: 'friend/reset',
  };
}

export function setFriendInfo(friendInfo: Loadable<UserInfo[]>, updatedUser?: UserInfo): SetFriendInfo {
  if (isLoaded(friendInfo)) {
    const sortedFriends: FriendEntries = Object.assign(
      {},
      ...sortFriendInfo(friendInfo).map((fi) => {
        if (updatedUser && updatedUser.id === fi.id) {
          return {
            [fi.id]: { ...fi, ...updatedUser },
          };
        }
        return {
          [fi.id]: fi,
        };
      }),
    );
    return {
      type: 'friend/setFriendInfo',
      friendInfo: sortedFriends,
    };
  }
  return {
    type: 'friend/setFriendInfo',
    friendInfo: friendInfo,
  };
}

export function setFriendFilter(filter: Partial<FriendFilter>): SetFriendFilter {
  return {
    type: 'friend/set-filter',
    filter,
  };
}

export function updateFriend(websocketNotification: WebSocketNotification): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (isFriendNotification(websocketNotification)) {
      switch (websocketNotification.type) {
        case 'friend-active':
        case 'friend-update':
        case 'friend-online':
          return handleUserActiveOrUpdateNotification(websocketNotification, state, dispatch);
        case 'friend-add':
          return handleUserAddNotification(websocketNotification, state, dispatch);
        case 'friend-delete':
          return handleUserDeleteNotification(websocketNotification, state, dispatch);
        case 'friend-offline':
          return handleUserOfflineNotification(websocketNotification, state, dispatch);
        case 'friend-location':
          return handleUserLocationNotification(websocketNotification, state, dispatch);
      }
    } else if (isNotification(websocketNotification)) {
      dispatch(addNotification(websocketNotification.content));
    }
  };
}
