import { AsyncAppAction } from '../thunk';
import { api, prepare } from './prepare';
import { UserExistsResponse, UserInfo } from './types';

export function usernameExits(
  userId: UserInfo['id'],
  displayName: UserInfo['displayName'],
): AsyncAppAction<UserExistsResponse | undefined> {
  return async function (dispatch, getState) {
    const result = await prepare<UserExistsResponse>(getState, dispatch, {
      url: api(`auth/exists`),
      blockable: true,
      params: [
        { key: 'username', value: displayName },
        { key: 'displayName', value: displayName },
        { key: 'excludeUserId', value: userId },
      ],
    });
    if (result.type === 'entity') {
      return result.result;
    }
  };
}
