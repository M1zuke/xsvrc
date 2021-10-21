import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserDeleteNotification(
  websocketNotification: FriendUpdatesUserId,
  state: AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [friends, oldUserInfo] = await getFriendsAndOldUser(state, dispatch, websocketNotification.content.userId);
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
  dispatch(setFriendInfo(friends.filter((ui) => ui.id !== websocketNotification.content.userId)));
}
