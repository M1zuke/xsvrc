import { resetStoredCookies } from '../store/cookies/actions';
import { setFriendInfo } from '../store/friends/action';
import { FriendInfo } from '../store/friends/state';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

const limit = 100;

export function friends(offline?: boolean, friendsInfo: FriendInfo[] = [], offset = 0): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.friends === null) {
      dispatch(setFriendInfo('loading'));
    }

    const response = await prepare<FriendInfo[]>(state, dispatch, {
      url: api('auth/user/friends'),
      params: [
        { key: 'offset', value: offset },
        { key: 'n', value: limit },
        { key: 'offline', value: (!!offline).toString() },
      ],
    });

    if (response.type === 'entity') {
      const newFriendInfo = [...friendsInfo, ...response.result];
      if (response.result.length === limit) {
        return dispatch(friends(offline, newFriendInfo, offset + limit));
      }
      dispatch(setFriendInfo(newFriendInfo));
    } else {
      dispatch(resetStoredCookies());
    }
  };
}
