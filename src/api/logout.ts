import { resetFriends } from '../store/friends/actions';
import { resetStoredCookies } from '../store/persisted/actions';
import { resetUserEvent } from '../store/user-events/action';
import { resetUser } from '../store/user/actions';
import { AppThunkAction } from '../thunk';

export function logout(): AppThunkAction<Promise<void>> {
  return async function (dispatch) {
    dispatch(resetFriends());
    dispatch(resetUser());
    dispatch(resetUserEvent());
    dispatch(resetStoredCookies());
  };
}
