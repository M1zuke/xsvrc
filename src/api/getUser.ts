import { setFriendInfo } from '../store/friends/actions';
import { setUserInfo } from '../store/user/actions';
import { isLoggedIn, selectUserInfo } from '../store/user/selectors';
import { AppThunkAction } from '../thunk';
import { api, isLoaded, prepare } from './prepare';
import { UserInfo } from './types';

export function getUser(id: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (!isLoggedIn(state)) {
      return;
    }

    const response = await prepare<UserInfo>(state, dispatch, {
      url: api(`users/${id}`),
    });

    const newState = getState();
    if (response.type === 'entity') {
      const userInfo = selectUserInfo(state);
      if (isLoaded(userInfo) && id === userInfo.id) {
        dispatch(setUserInfo({ ...userInfo, ...response.result }));
      } else {
        const friends = isLoaded(newState.friends.friendInfo) ? Object.values(newState.friends.friendInfo) : [];
        dispatch(setFriendInfo(friends, response.result));
      }
    } else {
      console.log(response);
    }
  };
}
