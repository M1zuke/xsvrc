import { isErrorType } from '../store/reducer';
import { setUserInfo } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { getAllFriends } from './friends-api';
import { logout } from './logout';
import { getAllNotifications } from './notifications';
import { api, prepare } from './prepare';
import { AuthenticatedUserInfo } from './types';

export function login(username?: string, password?: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.user.userInfo === null || isErrorType(state.user.userInfo)) {
      dispatch(setUserInfo('loading'));

      const result = await prepare<AuthenticatedUserInfo>(state, dispatch, {
        url: api('auth/user'),
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (result.type === 'entity') {
        await dispatch(getAllFriends()).finally();
        await dispatch(getAllNotifications()).finally();
        dispatch(setUserInfo(result.result));
      } else {
        dispatch(logout()).finally();
      }
    }
  };
}
