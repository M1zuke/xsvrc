import { setFriendInfo, setNonFriendInfo } from '../store/friends/actions';
import { setUserInfo } from '../store/user/actions';
import { isLoggedIn, selectUserInfo } from '../store/user/selectors';
import { AsyncAppAction } from '../thunk';
import { api, isLoaded, prepare } from './prepare';
import { UserInfo } from './types';

export function getUser(id: string): AsyncAppAction {
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
      } else if (!response.result.isFriend) {
        const nonFriends = isLoaded(newState.friends.nonFriendInfo)
          ? Object.values(newState.friends.nonFriendInfo)
          : [];
        dispatch(setNonFriendInfo([...nonFriends, response.result]));
      } else {
        dispatch(setFriendInfo(getState, [response.result]));
      }
    } else {
      console.error(response);
    }
  };
}
