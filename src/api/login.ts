import { isErrorType } from '../store/reducer';
import { setUserInfo } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { getAllFavoriteGroups, getAllFavorites } from './favorites-api';
import { getAllFriends } from './friends-api';
import { logout } from './logout';
import { getAllModerations } from './moderations';
import { getAllNotifications } from './notifications';
import { api, prepare } from './prepare';
import { AuthenticatedUserInfo } from './types';

export function login(username?: string, password?: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.user.userInfo === null || isErrorType(state.user.userInfo)) {
      dispatch(setUserInfo('loading'));

      const authorizationBuffer = Buffer.from(`${username}:${password}`);
      const base64 = authorizationBuffer.toString('base64');

      const result = await prepare<AuthenticatedUserInfo>(state, dispatch, {
        url: api('auth/user'),
        headers: {
          Authorization: `Basic ${base64}`,
        },
      });

      if (result.type === 'entity') {
        dispatch(setUserInfo(result.result));
        await dispatch(getAllFriends()).finally();
        await dispatch(getAllNotifications()).finally();
        await dispatch(getAllFavoriteGroups()).finally();
        await dispatch(getAllFavorites()).finally();
        dispatch(getAllModerations()).finally();
      } else {
        dispatch(logout()).finally();
      }
    }
  };
}
