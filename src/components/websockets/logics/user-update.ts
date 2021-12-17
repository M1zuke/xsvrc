import { isLoaded } from '../../../api/prepare';
import { UserInfo, UserUpdate } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { setUserInfo } from '../../../store/user/actions';
import { AppDispatch } from '../../../thunk';
import { compareUsers } from '../common';

export function handleUserUpdate(websocketNotification: UserUpdate, state: AppState, dispatch: AppDispatch): void {
  const userInfo = state.user.userInfo;
  if (isLoaded(userInfo)) {
    const userComparison = compareUsers(userInfo, websocketNotification.content.user as unknown as UserInfo);
    if (Object.keys(userComparison).length !== 0) {
      dispatch(
        addUserEvent({
          eventType: websocketNotification.type,
          displayName: websocketNotification.content.user.displayName,
          comparison: userComparison,
        }),
      );
      dispatch(setUserInfo({ ...userInfo, ...websocketNotification.content.user }));
    }
  }
}
