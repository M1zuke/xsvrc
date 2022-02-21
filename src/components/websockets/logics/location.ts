import { FriendLocationUpdate, UserInfo } from '../../../api/types';
import { AppState } from '../../../store';
import { setFriendInfo } from '../../../store/friends/actions';
import { addUserEvent } from '../../../store/user-events/action';
import { setWorldInfo } from '../../../store/worlds/actions';
import { AppDispatch } from '../../../thunk';
import { getFriendsAndOldUser } from '../common';

export async function handleUserLocationNotification(
  websocketNotification: FriendLocationUpdate,
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<void> {
  const [friends, oldUserInfo] = await getFriendsAndOldUser(getState, dispatch, websocketNotification.content.userId);
  const enrichedUser: UserInfo = {
    ...websocketNotification.content.user,
    location: websocketNotification.content.location,
    worldId: websocketNotification.content.world.id,
    instanceId: websocketNotification.content.instance,
  };
  const userLocation = oldUserInfo?.location === '' ? 'Logged in through website' : oldUserInfo?.location || 'private';

  if (userLocation !== websocketNotification.content.location) {
    dispatch(
      addUserEvent({
        userId: websocketNotification.content.userId,
        eventType: websocketNotification.type,
        displayName: websocketNotification.content.user.displayName,
        comparison: {
          location: {
            from: userLocation,
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
