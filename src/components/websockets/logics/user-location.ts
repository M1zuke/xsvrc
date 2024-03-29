import { isLoaded } from '../../../api/prepare';
import { UserLocationUpdate } from '../../../api/types';
import { AppState } from '../../../store';
import { addHistory } from '../../../store/history/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { setUserInfo } from '../../../store/user/actions';
import { setWorldInfo } from '../../../store/worlds/actions';
import { AppDispatch } from '../../../thunk';

export function handleUserLocationUpdate(
  websocketNotification: UserLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): void {
  const userInfo = getState().user.userInfo;
  if (isLoaded(userInfo) && userInfo.location !== websocketNotification.content.location) {
    dispatch(addHistory(userInfo.id, userInfo.location, websocketNotification.content.location));
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
