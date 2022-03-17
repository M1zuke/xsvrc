import { FriendLocationUpdate, FriendUpdateWithUser } from '../../../api/types';
import { AppState } from '../../../store';
import { addUserEvent } from '../../../store/user-events/action';
import { AppDispatch } from '../../../thunk';
import { fetchNewUserInfo, getOldUser } from '../common';

export async function handleUserAddNotification(
  websocketNotification: FriendUpdateWithUser | FriendLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const oldUserInfo = await getOldUser(getState, dispatch, websocketNotification.content.userId);
  const userInfo = await fetchNewUserInfo(websocketNotification.content.userId, getState, dispatch).finally();

  dispatch(
    addUserEvent({
      userId: websocketNotification.content.userId,
      eventType: websocketNotification.type,
      displayName: userInfo.displayName,
      comparison: {
        isFriend: {
          from: oldUserInfo?.isFriend ?? false,
          to: userInfo.isFriend,
        },
      },
    }),
  );
}
