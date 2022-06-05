import { setUserInfo } from '../store/user/actions';
import { AsyncAppAction } from '../thunk';
import { api, prepare } from './prepare';
import { AuthenticatedUserInfo, UserInfo } from './types';

export function changeUsername(
  userId: UserInfo['id'],
  displayName: UserInfo['displayName'],
  currentPassword: string,
): AsyncAppAction<string | undefined> {
  return async function (dispatch, getState) {
    const result = await prepare<AuthenticatedUserInfo>(getState, dispatch, {
      url: api(`users/${userId}`),
      method: 'PUT',
      blockable: true,
      body: {
        currentPassword,
        displayName,
      },
    });

    if (result.type === 'entity') {
      dispatch(setUserInfo(result.result));
      return undefined;
    }
    return result.error.message;
  };
}
