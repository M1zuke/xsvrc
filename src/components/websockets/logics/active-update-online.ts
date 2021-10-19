import { FriendLocationUpdate, FriendUpdateWithUser } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { compareUsers, getFriendsAndOldUser } from '../common';

export function handleUserActiveOrUpdateNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  state: AppState,
  dispatch: AppDispatch,
): void {
  const [friends, oldUserInfo] = getFriendsAndOldUser(state, websocketNotification.content.userId);
  const userComparison = compareUsers(oldUserInfo, websocketNotification.content.user);
  if (Object.keys(userComparison).length !== 0) {
    dispatch(
      addUserEvent({
        eventType: websocketNotification.type,
        displayName: websocketNotification.content.user.displayName,
        comparison: userComparison,
      }),
    );
  }
  dispatch(setFriendInfo(friends, websocketNotification.content.user));
}
