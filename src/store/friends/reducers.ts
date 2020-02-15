import { sortBy } from 'lodash';
import { isAction } from '../../costumTypes/typeUtils';
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
    const sortedFriends = sortBy(action.payload, (o) => o.displayName);
    return {
      ...state,
      friendInfos: [...sortedFriends],
      friendsFetched: true,
      lastFetched: new Date(),
    };
  }

  return state;
}
