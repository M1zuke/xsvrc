import { FriendLocationUpdate, FriendUpdateWithUser } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { compareUsers, fetchNewUserInfo, getOldUser } from '../common';

export async function handleUserActiveOrUpdateNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const oldUserInfo = await getOldUser(getState, dispatch, websocketNotification.content.userId);
  const userInfo = await fetchNewUserInfo(websocketNotification.content.userId, getState, dispatch).finally();

  const userComparison = compareUsers(oldUserInfo, userInfo);
  if (Object.keys(userComparison).length !== 0) {
    dispatch(
      addUserEvent({
        userId: websocketNotification.content.userId,
        eventType: websocketNotification.type,
        displayName: userInfo?.displayName ?? websocketNotification.content.user.displayName,
        comparison: userComparison,
      }),
    );
  }
}
