import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { fetchNewUserInfo, getOldUser } from '../common';

export async function handleUserOfflineNotification(
  websocketNotification: FriendUpdatesUserId,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const oldUserInfo = await getOldUser(getState, dispatch, websocketNotification.content.userId);
  const userInfo = await fetchNewUserInfo(websocketNotification.content.userId, getState, dispatch).finally();

  dispatch(
    addUserEvent({
      userId: websocketNotification.content.userId,
      eventType: websocketNotification.type,
      displayName: userInfo?.displayName ?? websocketNotification.content.userId,
      comparison: {
        location: {
          from: oldUserInfo?.location ?? 'offline',
          to: userInfo.location ?? 'offline',
        },
      },
    }),
  );
}
