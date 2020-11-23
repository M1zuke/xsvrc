import { History } from 'history';
import { routes } from '../common/routes';
import { resetStoredCookies } from '../store/cookies/actions';
import { setUserState } from '../store/user/actions';
import { VRCUserInfo } from '../store/user/state';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function login(username: string, password: string, history: History): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    dispatch(setUserState('loading'));

    const result = await prepare<VRCUserInfo>(state, dispatch, {
      url: api('auth/user'),
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });

    if (result.type === 'entity') {
      dispatch(setUserState(result.result));
      history.push(routes.home.path);
    } else {
      dispatch(setUserState(result));
      dispatch(resetStoredCookies());
    }
  };
}
