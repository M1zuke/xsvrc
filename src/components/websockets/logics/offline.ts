import { getUser } from '../../../api/getUser';
import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserOfflineNotification(
  websocketNotification: FriendUpdatesUserId,
  state: AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [, oldUserInfo] = await getFriendsAndOldUser(state, dispatch, websocketNotification.content.userId);
  dispatch(
    addUserEvent({
      eventType: websocketNotification.type,
      displayName: oldUserInfo?.displayName ?? websocketNotification.content.userId,
      comparison: {
        location: {
          from: oldUserInfo?.location || 'offline',
          to: 'offline',
        },
        state: {
          from: oldUserInfo?.state || 'offline',
          to: 'offline',
        },
        status: {
          from: oldUserInfo?.status || 'offline',
          to: 'offline',
        },
      },
    }),
  );
  dispatch(getUser(websocketNotification.content.userId)).finally();
}
