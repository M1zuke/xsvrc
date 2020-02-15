import { UPDATE_FRIEND_INFOS, UpdateFriendInfosAction } from './types';

export function updateFriendInfos(friendInfos: FriendInfo[]): UpdateFriendInfosAction {
  return {
    type: UPDATE_FRIEND_INFOS,
    payload: friendInfos,
  };
}
