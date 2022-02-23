import { AppState } from '../store';
import { setFriendInfo } from '../store/friends/actions';
import { resetStoredCookies } from '../store/persisted/actions';
import { removeFavorite, setUserInfo } from '../store/user/actions';
import { GetFavoriteOfUser } from '../store/user/selectors';
import { AppDispatch, AppThunkAction } from '../thunk';
import { api, isLoaded, prepare } from './prepare';
import { UserInfo } from './types';

const limit = 100;

export function getFriends(offline?: boolean, friendsInfo: UserInfo[] = [], offset = 0): AppThunkAction<UserInfo[]> {
  return async function (dispatch, getState) {
    const state = getState();

    const response = await prepare<UserInfo[]>(state, dispatch, {
      url: api('auth/user/friends'),
      params: [
        { key: 'offset', value: offset },
        { key: 'n', value: limit },
        { key: 'offline', value: (!!offline).toString() },
      ],
    });

    if (response.type === 'entity') {
      const newFriendInfo = [...friendsInfo, ...response.result];
      const friendsLimit = isLoaded(state.user.userInfo)
        ? offline
          ? state.user.userInfo.offlineFriends.length
          : state.user.userInfo.onlineFriends.length
        : 0;
      if (offset <= friendsLimit) {
        return dispatch(getFriends(offline, newFriendInfo, offset + limit));
      }
      return newFriendInfo;
    }
    dispatch(resetStoredCookies());
    return [];
  };
}

export function getAllFriends(): AppThunkAction {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.friends.friendInfo === null) {
      dispatch(setFriendInfo(getState, 'loading'));
    }
    const onlineFriends = await dispatch(getFriends());
    const offlineFriends = await dispatch(getFriends(true));

    const newState = getState();
    if (isLoaded(newState.friends.friendInfo)) {
      const allFriends = [...Object.values(newState.friends.friendInfo), ...offlineFriends, ...onlineFriends];
      dispatch(setFriendInfo(getState, mapStateToUsers(getState, allFriends)));
    } else {
      const allFriends = [...offlineFriends, ...onlineFriends];
      dispatch(setFriendInfo(getState, mapStateToUsers(getState, allFriends)));
    }
  };
}

export function sendFriendRequest(id: string): AppThunkAction {
  return async function (dispatch, getState) {
    const response = await prepare(getState, dispatch, {
      url: api(`user/${id}/friendRequest`),
      method: 'POST',
    });

    if (response.type === 'entity') {
      console.log(response.result);
    } else {
      console.error(response);
    }
  };
}

export function sendUnfriendRequest(id: string): AppThunkAction {
  return async function (dispatch, getState) {
    const response = await prepare(getState, dispatch, {
      url: api(`auth/user/friends/${id}`),
      method: 'DELETE',
    });

    const state = getState();
    if (response.type === 'entity') {
      if (isLoaded(state.friends.friendInfo)) {
        const favorite = GetFavoriteOfUser(id)(state);
        if (favorite) {
          dispatch(removeFavorite(favorite));
        }
        // dispatch(setFriendInfo([...Object.values(state.friends.friendInfo).filter((ui) => ui.id !== id)]));
      }
    } else {
      console.error(response);
    }
  };
}

export function mapStateToUsers(getState: () => AppState, friendInfos: UserInfo[]): UserInfo[] {
  return friendInfos.map((fi) => mapStateToUserInfo(getState, fi));
}

export function mapStateToUserInfo(getState: () => AppState, friendInfo: UserInfo): UserInfo {
  const state = getState();
  const userInfo = state.user.userInfo;
  if (isLoaded(userInfo)) {
    const activeIds = userInfo.activeFriends;

    if (activeIds.includes(friendInfo.id)) {
      return {
        ...friendInfo,
        state: 'active',
        location: '',
      };
    }
  }
  return friendInfo;
}

export function moveFriendStateInUserInfo(
  getState: () => AppState,
  dispatch: AppDispatch,
  userId: string,
  moveTo: UserInfo['state'],
): void {
  const state = getState();
  const userInfo = state.user.userInfo;
  if (isLoaded(userInfo)) {
    const onlineIds = userInfo.onlineFriends.filter((id) => id !== userId);
    const activeIds = userInfo.onlineFriends.filter((id) => id !== userId);
    const offlineIds = userInfo.onlineFriends.filter((id) => id !== userId);

    dispatch(
      setUserInfo({
        ...userInfo,
        onlineFriends: moveTo === 'online' ? [...onlineIds, userId] : [...onlineIds],
        activeFriends: moveTo === 'active' ? [...activeIds, userId] : [...activeIds],
        offlineFriends: moveTo === 'offline' ? [...offlineIds, userId] : [...offlineIds],
      }),
    );
  }
}
