import { FriendUpdatesUserId } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export function handleUserDeleteNotification(
  websocketNotification: FriendUpdatesUserId,
  state: AppState,
  dispatch: AppDispatch,
): void {
  const [friends, oldUserInfo] = getFriendsAndOldUser(state, websocketNotification.content.userId);
  dispatch(
    addUserEvent({
      eventType: websocketNotification.type,
      displayName: oldUserInfo?.displayName ?? websocketNotification.content.userId,
      comparison: {
        isFriend: {
          from: oldUserInfo?.isFriend ?? true,
          to: false,
        },
      },
    }),
  );
  dispatch(setFriendInfo(friends.filter((ui) => ui.id !== websocketNotification.content.userId)));
}
