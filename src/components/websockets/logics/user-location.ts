import { isLoaded } from '../../../api/prepare';
import { UserLocationUpdate } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { setUserInfo } from '../../../store/user/actions';
import { setWorldInfo } from '../../../store/worlds/actions';
import { AppDispatch } from '../../../thunk';

export function handleUserLocationUpdate(
  websocketNotification: UserLocationUpdate,
  state: AppState,
  dispatch: AppDispatch,
): void {
  const userInfo = state.user.userInfo;
  if (isLoaded(userInfo)) {
    dispatch(
      addUserEvent({
        userId: websocketNotification.content.userId,
        eventType: websocketNotification.type,
        displayName: userInfo.displayName,
        comparison: {
          location: {
            from: userInfo.location,
            to: websocketNotification.content.location,
          },
        },
      }),
    );
    dispatch(setUserInfo({ ...userInfo, location: websocketNotification.content.location }));
    dispatch(setWorldInfo(websocketNotification.content.world.id, websocketNotification.content.world));
  }
}
