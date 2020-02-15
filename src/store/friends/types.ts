export const UPDATE_FRIEND_INFOS = "UPDATE_FRIEND_INFOS";

export interface UpdateFriendInfosAction {
  type: typeof UPDATE_FRIEND_INFOS;
  payload: FriendInfo[];
}

export type FriendActionTypes =
  | UpdateFriendInfosAction
