import { setFriendById } from '../store/friends/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { UserInfo } from './types';

export function getUser(id: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    const response = await prepare<UserInfo>(state, dispatch, {
      url: api(`users/${id}`),
    });

    if (response.type === 'entity') {
      dispatch(setFriendById(response.result.id, response.result));
    }
  };
}
