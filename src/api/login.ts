import { History } from 'history';
import { routes } from '../common/routes';
import { resetStoredCookies } from '../store/cookies/actions';
import { setUserState } from '../store/user/actions';
import { AuthenticatedUserInfo } from '../store/user/state';
import { AppThunkAction } from '../thunk';
import { getUser } from './getUser';
import { api, isLoaded, prepare } from './prepare';

export function login(username: string, password: string, history: History): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch(setUserState('loading'));

    const result = await prepare<AuthenticatedUserInfo>(state, dispatch, {
      url: api('auth/user'),
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    if (result.type === 'entity') {
      const userInfo = await dispatch(getUser(result.result.id));
      if (isLoaded(userInfo)) {
        dispatch(setUserState({ ...result.result, ...userInfo }));
        history.push(routes.home.path);
      }
    } else {
      dispatch(setUserState(result));
      dispatch(resetStoredCookies());
    }
  };
}
