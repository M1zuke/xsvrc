import { FriendLocationUpdate, FriendUpdateWithUser, UserInfo } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { compareUsers, getFriendsAndOldUser } from '../common';

export async function handleUserActiveOrUpdateNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [friends, oldUserInfo] = await getFriendsAndOldUser(getState, dispatch, websocketNotification.content.userId);
  const enrichedUser: UserInfo =
    websocketNotification.type === 'friend-active'
      ? { ...websocketNotification.content.user, state: 'active', location: 'offline' }
      : websocketNotification.content.user;

  const userComparison = compareUsers(oldUserInfo, enrichedUser);
  if (Object.keys(userComparison).length !== 0) {
    dispatch(
      addUserEvent({
        userId: websocketNotification.content.userId,
        eventType: websocketNotification.type,
        displayName: enrichedUser.displayName,
        comparison: userComparison,
      }),
    );
  }
  dispatch(setFriendInfo(friends, enrichedUser));
}
