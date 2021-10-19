import { FriendLocationUpdate, FriendUpdateWithUser } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export function handleUserAddNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  state: AppState,
  dispatch: AppDispatch,
): void {
  const [friends, oldUserInfo] = getFriendsAndOldUser(state, websocketNotification.content.userId);
  dispatch(
    addUserEvent({
      eventType: websocketNotification.type,
      displayName: websocketNotification.content.user.displayName,
      comparison: {
        isFriend: {
          from: oldUserInfo?.isFriend ?? false,
          to: true,
        },
      },
    }),
  );
  dispatch(setFriendInfo(friends, websocketNotification.content.user));
}
