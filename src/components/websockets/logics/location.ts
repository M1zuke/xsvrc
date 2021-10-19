import { FriendLocationUpdate, UserInfo } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { setWorldInfo } from '../../../store/worlds/actions';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserLocationNotification(
  websocketNotification: FriendLocationUpdate,
  state: AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [friends, oldUserInfo] = await getFriendsAndOldUser(state, dispatch, websocketNotification.content.userId);
  const enrichedUser: UserInfo = {
    ...websocketNotification.content.user,
    location: websocketNotification.content.location,
    worldId: websocketNotification.content.world.id,
    instanceId: websocketNotification.content.instance,
  };
  if ((oldUserInfo?.location || 'private') !== websocketNotification.content.location) {
    dispatch(
      addUserEvent({
        eventType: websocketNotification.type,
        displayName: websocketNotification.content.user.displayName,
        comparison: {
          location: {
            from: oldUserInfo?.location || 'private',
            to: websocketNotification.content.location,
          },
        },
      }),
    );
  }
  if (websocketNotification.content.location !== 'private' && websocketNotification.content.location !== '') {
    dispatch(setWorldInfo(websocketNotification.content.world.id, websocketNotification.content.world));
  }
  dispatch(setFriendInfo(friends, enrichedUser));
}
