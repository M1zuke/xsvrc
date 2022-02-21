import { getUser } from '../../../api/getUser';
import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserOfflineNotification(
  websocketNotification: FriendUpdatesUserId,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [, oldUserInfo] = await getFriendsAndOldUser(getState, dispatch, websocketNotification.content.userId);
  dispatch(
    addUserEvent({
      userId: websocketNotification.content.userId,
      eventType: websocketNotification.type,
      displayName: oldUserInfo?.displayName ?? websocketNotification.content.userId,
      comparison: {
        location: {
          from: oldUserInfo?.location || 'offline',
          to: 'offline',
        },
      },
    }),
  );
  dispatch(getUser(websocketNotification.content.userId)).finally();
}
