import { resetFriends } from '../store/friends/actions';
import { resetStoredCookies } from '../store/persisted/actions';
import { resetUserEvent } from '../store/user-events/action';
import { resetUser } from '../store/user/actions';
import { AsyncAppAction } from '../thunk';
import { api, prepare } from './prepare';

export function logout(): AsyncAppAction {
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
