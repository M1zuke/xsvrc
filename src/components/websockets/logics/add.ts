import { FriendLocationUpdate, FriendUpdateWithUser } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserAddNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  state: AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [friends, oldUserInfo] = await getFriendsAndOldUser(state, dispatch, websocketNotification.content.userId);
  dispatch(
    addUserEvent({
      userId: websocketNotification.content.userId,
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
  dispatch(setFriendInfo([...friends, websocketNotification.content.user]));
}
