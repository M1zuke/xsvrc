import { isAction } from '../../costumTypes/typeUtils';
import { sort } from '../../services/utils.service';
import { FriendActionTypes, UPDATE_FRIEND_INFOS, UpdateFriendInfosAction } from './types';

export interface FriendListState {
  friendsFetched: boolean;
  friendInfos: FriendInfo[];
  lastFetched: Date;
}

const initialState: FriendListState = {
  friendsFetched: false,
  friendInfos: [],
  lastFetched: new Date(0),
};

export function friendReducer(state: FriendListState = initialState, action: FriendActionTypes): FriendListState {

  if (isAction<UpdateFriendInfosAction>(action, UPDATE_FRIEND_INFOS)) {
    const sortedFriends = sort(action.payload, 'displayName');
    return {
      ...state,
      friendInfos: [...sortedFriends],
      friendsFetched: true,
      lastFetched: new Date(),
    };
  }

  return state;
}
