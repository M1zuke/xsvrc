import { History } from 'history';
import { routes } from '../common/routes';
import { resetStoredCookies } from '../store/cookies/actions';
import { setUserInfo } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { getAllFriends } from './friends-api';
import { getAllNotifications } from './notifications';
import { api, prepare } from './prepare';
import { AuthenticatedUserInfo } from './types';

export function login(username?: string, password?: string, history?: History): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.user.userInfo === null) {
      dispatch(setUserInfo('loading'));
    }

    const result = await prepare<AuthenticatedUserInfo>(state, dispatch, {
      url: api('auth/user'),
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    if (result.type === 'entity') {
      dispatch(setUserInfo(result.result));
      dispatch(getAllFriends()).finally();
      dispatch(getAllNotifications()).finally();
      history && history.push(routes.home.path);
    } else {
      dispatch(setUserInfo(result));
      dispatch(resetStoredCookies());
    }
  };
}
