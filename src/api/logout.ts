import { resetFriends } from '../store/friends/actions';
import { resetStoredCookies } from '../store/persisted/actions';
import { resetUserEvent } from '../store/user-events/action';
import { resetUser } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function logout(): AppThunkAction {
  return async function (dispatch, getState) {
    dispatch(resetStoredCookies());
    dispatch(resetFriends());
    dispatch(resetUser());
    dispatch(resetUserEvent());

    await prepare(getState, dispatch, {
      url: api('logout'),
      method: 'PUT',
    });
  };
}
