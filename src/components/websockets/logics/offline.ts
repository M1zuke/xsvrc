import { getUser } from '../../../api/getUser';
import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export function handleUserOfflineNotification(
  websocketNotification: FriendUpdatesUserId,
  state: AppState,
  dispatch: AppDispatch,
): void {
  const [, oldUserInfo] = getFriendsAndOldUser(state, websocketNotification.content.userId);
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
