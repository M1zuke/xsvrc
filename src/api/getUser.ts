import { setCachedUser } from '../store/friends/action';
import { UserInfo } from '../store/friends/state';
import { Loadable } from '../store/reducer';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function getUser(id: string): AppThunkAction<Promise<Loadable<UserInfo>>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.friends.cachedUsers[id] === undefined) {
      dispatch(setCachedUser(id, 'loading'));
    }

    const response = await prepare<UserInfo>(state, dispatch, {
      url: api(`users/${id}`),
    });

    if (response.type === 'entity') {
      dispatch(setCachedUser(id, response.result));
      return response.result;
    }
    dispatch(setCachedUser(id, response));
    return response;
  };
}
