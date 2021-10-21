import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserDeleteNotification(
  websocketNotification: FriendUpdatesUserId,
  state: AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [, oldUserInfo] = await getFriendsAndOldUser(state, dispatch, websocketNotification.content.userId, true);
  dispatch(
    addUserEvent({
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
