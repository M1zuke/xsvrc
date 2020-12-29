import { getUser } from '../../api/getUser';
import { isLoaded } from '../../api/prepare';
import { isFriendNotification, isNotification, UserInfo, WebSocketNotification } from '../../api/types';
import { CharacterFilter, CharacterFilters } from '../../container/views/friends/Friends';
import { AppThunkAction } from '../../thunk';
import { Loadable } from '../reducer';
import { addUserEvent, saveWorldInfo } from '../user-events/action';
import { addNotification } from '../user/actions';
import { FriendEntries } from './state';
import { SetFriendById, SetFriendInfo } from './types';

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

export function setFriendInfo(friendInfo: Loadable<UserInfo[]>): SetFriendInfo {
  if (isLoaded(friendInfo)) {
    const sortedFriends: FriendEntries = Object.assign(
      {},
      ...sortFriendInfo(friendInfo).map((fi) => ({
        [fi.id]: fi,
      })),
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

export function setFriendById(id: string, userInfo: UserInfo): SetFriendById {
  return {
    type: 'friend/setFriendById',
    id,
    userInfo,
  };
}

export function updateFriend(websocketNotification: WebSocketNotification): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (isLoaded(state.friends) && isFriendNotification(websocketNotification)) {
      const oldUserInfo = state.friends[websocketNotification.content.userId];
      const eventKey = state.userEvents.userEvents.length;

      if (oldUserInfo) {
        switch (websocketNotification.type) {
          case 'friend-active':
          case 'friend-update': {
            dispatch(setFriendById(websocketNotification.content.userId, websocketNotification.content.user));
            if (
              oldUserInfo.currentAvatarThumbnailImageUrl !==
              websocketNotification.content.user.currentAvatarThumbnailImageUrl
            ) {
              dispatch(
                addUserEvent({
                  displayName: oldUserInfo.displayName,
                  key: 'currentAvatarThumbnailImageUrl',
                  previous: oldUserInfo.currentAvatarThumbnailImageUrl,
                  current: websocketNotification.content.user.currentAvatarThumbnailImageUrl,
                  eventKey,
                }),
              );
            }
            break;
          }
          case 'friend-online': {
            dispatch(
              addUserEvent({
                displayName: oldUserInfo.displayName,
                key: 'status',
                previous: oldUserInfo.status,
                current: websocketNotification.content.user.status,
                eventKey,
              }),
            );
            break;
          }
          case 'friend-add': {
            dispatch(setFriendById(websocketNotification.content.userId, websocketNotification.content.user));
            dispatch(
              addUserEvent({
                displayName: oldUserInfo.displayName,
                key: 'isFriend',
                previous: false,
                current: websocketNotification.content.user.isFriend,
                eventKey,
              }),
            );
            break;
          }
          case 'friend-delete': {
            dispatch(
              setFriendInfo(
                Object.values(state.friends).filter((ui) => ui.id !== websocketNotification.content.userId),
              ),
            );
            dispatch(
              addUserEvent({
                displayName: oldUserInfo.displayName,
                key: 'isFriend',
                previous: oldUserInfo.isFriend,
                current: false,
                eventKey,
              }),
            );
            break;
          }
          case 'friend-offline': {
            dispatch(
              setFriendById(websocketNotification.content.userId, {
                ...oldUserInfo,
                location: 'offline',
                status: 'offline',
                state: 'offline',
              }),
            );
            dispatch(
              addUserEvent({
                displayName: oldUserInfo.displayName,
                key: 'status',
                previous: oldUserInfo.status,
                current: 'offline',
                eventKey,
              }),
            );
            break;
          }
          case 'friend-location': {
            const enrichedUser: UserInfo = {
              ...websocketNotification.content.user,
              location: websocketNotification.content.location,
              worldId: websocketNotification.content.world.id,
              instanceId: websocketNotification.content.instance,
            };
            dispatch(setFriendById(websocketNotification.content.userId, enrichedUser));
            if (websocketNotification.content.location !== 'private') {
              dispatch(saveWorldInfo(websocketNotification.content.world));
            }
            dispatch(
              addUserEvent({
                displayName: oldUserInfo.displayName,
                key: 'location',
                previous: oldUserInfo.location,
                current: websocketNotification.content.location,
                eventKey,
              }),
            );
          }
        }
      } else {
        await dispatch(getUser(websocketNotification.content.userId)).finally();
        updateFriend(websocketNotification);
      }
    } else if (isNotification(websocketNotification)) {
      dispatch(addNotification(websocketNotification.content));
    }
  };
}
