import { resetStoredCookies } from '../store/cookies/actions';
import { setFriendInfo } from '../store/friends/action';
import { FriendInfo } from '../store/friends/state';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function friends(): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.friends === null) {
      dispatch(setFriendInfo('loading'));
    }

    const result = await prepare<FriendInfo[]>(state, dispatch, {
      url: api('auth/user/friends'),
      params: [{ key: 'offline', value: 'false' }],
    });

    if (result.type === 'entity') {
      dispatch(setFriendInfo(result.result));
    } else {
      dispatch(resetStoredCookies());
    }
  };
}
