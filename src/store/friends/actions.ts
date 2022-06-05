import { isLoaded } from '../../api/prepare';
import {
  isFriendNotification,
  isNotification,
  isUserNotification,
  UserInfo,
  WebSocketNotification,
} from '../../api/types';
import { handleUserActiveOrUpdateNotification } from '../../components/websockets/logics/active-update-online-offline';
import { handleUserAddNotification } from '../../components/websockets/logics/add';
import { handleUserDeleteNotification } from '../../components/websockets/logics/delete';
import { handleUserLocationNotification } from '../../components/websockets/logics/location';
import { handleUserLocationUpdate } from '../../components/websockets/logics/user-location';
import { handleUserUpdate } from '../../components/websockets/logics/user-update';
import { AsyncAppAction } from '../../thunk';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { addNotification } from '../user/actions';
import { FriendEntries, FriendFilter } from './state';
import { ResetFriends, SetFriendFilter, SetFriendInfo, SetNonFriendInfo } from './types';

export function compare<T extends keyof UserInfo, V = UserInfo[T]>(a: V, b: V): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase().localeCompare(b.toLowerCase(), 'en');
  }

  return 0;
}

// function sortFunction(a: UserInfo, b: UserInfo): number {
//   return compare(a.displayName, b.displayName);
// }

function sortFriendInfo(friendInfo: UserInfo[]): UserInfo[] {
  return friendInfo;
  // return [...specialCharacterFriendInfo.sort(sortFunction), ...cleanFriendInfo.sort(sortFunction)];
}

export function resetFriends(): ResetFriends {
  return {
    type: 'friend/reset',
  };
}

function convertToFriendEntries(userInfos: UserInfo[]): FriendEntries {
  return Object.assign({}, ...userInfos.map((ui) => ({ [ui.id]: ui })));
}

export function convertAndSortFriendEntries(userInfos: UserInfo[]): FriendEntries {
  return convertToFriendEntries(sortFriendInfo(userInfos));
}

export function setFriendInfo(getState: () => AppState, newFriendInfo: Loadable<UserInfo[]>): SetFriendInfo {
  const state = getState();
  const oldFriendInfo = state.friends.friendInfo;
  if (isLoaded(newFriendInfo) && isLoaded(oldFriendInfo)) {
    const mergedArray = [...Object.values(oldFriendInfo)];
    newFriendInfo.forEach((ui) => {
      if (!mergedArray.find((u) => u.id === ui.id)) {
        mergedArray.push(ui);
      }
    });

    const mergedFriendInfo = mergedArray.map((ui) => {
      const newUserInfo = newFriendInfo.find((fi) => fi.id === ui.id);
      if (newUserInfo) {
        return {
          ...ui,
          ...newUserInfo,
        };
      }
      return { ...ui };
    });

    return {
      type: 'friend/setFriendInfo',
      friendInfo: convertAndSortFriendEntries(mergedFriendInfo),
    };
  }
  if (isLoaded(newFriendInfo)) {
    return {
      type: 'friend/setFriendInfo',
      friendInfo: convertAndSortFriendEntries(newFriendInfo),
    };
  }
  return {
    type: 'friend/setFriendInfo',
    friendInfo: newFriendInfo,
  };
}

export function setNonFriendInfo(userInfo: Loadable<UserInfo[]>): SetNonFriendInfo {
  if (isLoaded(userInfo)) {
    const mappedUserInfo: FriendEntries = Object.assign(
      {},
      ...userInfo.map((ui) => {
        return {
          [ui.id]: ui,
        };
      }),
    );
    return {
      type: 'friend/set-non-friend',
      userInfo: mappedUserInfo,
    };
  }

  return {
    type: 'friend/set-non-friend',
    userInfo: userInfo,
  };
}

export function setFriendFilter(filter: Partial<FriendFilter>): SetFriendFilter {
  return {
    type: 'friend/set-filter',
    filter,
  };
}

export function updateFriend(websocketNotification: WebSocketNotification): AsyncAppAction {
  return async function (dispatch, getState) {
    if (isFriendNotification(websocketNotification)) {
      switch (websocketNotification.type) {
        case 'friend-active':
        case 'friend-update':
        case 'friend-online':
        case 'friend-offline':
          return handleUserActiveOrUpdateNotification(websocketNotification, getState, dispatch);
        case 'friend-add':
          return handleUserAddNotification(websocketNotification, getState, dispatch);
        case 'friend-delete':
          return handleUserDeleteNotification(websocketNotification, getState, dispatch);
        case 'friend-location':
          return handleUserLocationNotification(websocketNotification, getState, dispatch);
      }
    } else if (isNotification(websocketNotification)) {
      dispatch(addNotification(websocketNotification.content));
    } else if (isUserNotification(websocketNotification)) {
      switch (websocketNotification.type) {
        case 'user-update':
          return handleUserUpdate(websocketNotification, getState, dispatch);
        case 'user-location':
          return handleUserLocationUpdate(websocketNotification, getState, dispatch);
      }
    } else {
      console.error('new websocket type!', websocketNotification);
    }
  };
}
