import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getOldUser } from '../common';

export async function handleUserDeleteNotification(
  websocketNotification: FriendUpdatesUserId,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const oldUserInfo = await getOldUser(getState, dispatch, websocketNotification.content.userId, true);

  dispatch(
    addUserEvent({
      userId: websocketNotification.content.userId,
      eventType: websocketNotification.type,
      displayName: oldUserInfo?.displayName ?? websocketNotification.content.userId,
      comparison: {
        isFriend: {
          from: true,
          to: false,
        },
      },
    }),
  );
}
