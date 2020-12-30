import { setFriendInfo } from '../store/friends/actions';
import { resetStoredCookies } from '../store/persisted/actions';
import { AppThunkAction } from '../thunk';
import { api, isLoaded, prepare } from './prepare';
import { UserInfo } from './types';

const limit = 100;

export function getFriends(
  offline?: boolean,
  friendsInfo: UserInfo[] = [],
  offset = 0,
): AppThunkAction<Promise<UserInfo[]>> {
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
      if (response.result.length > 0) {
        return dispatch(getFriends(offline, newFriendInfo, offset + limit));
      }
      return newFriendInfo;
    }
    dispatch(resetStoredCookies());
    return [];
  };
}

export function getAllFriends(): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.friends === null) {
      dispatch(setFriendInfo('loading'));
    }
    const onlineFriends = await dispatch(getFriends());
    const offlineFriends = await dispatch(getFriends(true));

    const newState = getState();
    if (isLoaded(newState.friends)) {
      dispatch(setFriendInfo([...Object.values(newState.friends), ...offlineFriends, ...onlineFriends]));
    } else {
      dispatch(setFriendInfo([...offlineFriends, ...onlineFriends]));
    }
  };
}

export function sendFriendRequest(id: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const response = await prepare(getState, dispatch, {
      url: api(`user/${id}/friendRequest`),
      method: 'POST',
    });

    if (response.type === 'entity') {
      console.log(response.result);
    } else {
      console.log(response);
    }
  };
}
