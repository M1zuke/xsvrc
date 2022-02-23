import { FriendLocationUpdate } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { setWorldInfo } from '../../../store/worlds/actions';
import { AppDispatch } from '../../../thunk';
import { fetchNewUserInfo, getOldUser } from '../common';

export async function handleUserLocationNotification(
  websocketNotification: FriendLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const oldUserInfo = await getOldUser(getState, dispatch, websocketNotification.content.userId);
  const userInfo = await fetchNewUserInfo(websocketNotification.content.userId, getState, dispatch).finally();

  const userLocation = oldUserInfo?.location || 'private';

  if (userLocation !== websocketNotification.content.location) {
    dispatch(
      addUserEvent({
        userId: websocketNotification.content.userId,
        eventType: websocketNotification.type,
        displayName: userInfo.displayName,
        comparison: {
          location: {
            from: userLocation,
            to: websocketNotification.content.location,
          },
        },
      }),
    );
  }
  if (websocketNotification.content.location !== 'private' && websocketNotification.content.location !== '') {
    dispatch(setWorldInfo(websocketNotification.content.world.id, websocketNotification.content.world));
  }
}
