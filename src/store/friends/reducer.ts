import { isLoaded } from '../../api/prepare';
import { FriendInfoState, INITIAL_FRIEND_INFO_STATE } from './state';
import { FriendActions } from './types';

export function reducer(state: FriendInfoState = INITIAL_FRIEND_INFO_STATE, action: FriendActions): FriendInfoState {
  switch (action.type) {
    case 'friend/setFriendInfo': {
      return {
        ...state,
        friendInfo: action.friendInfo,
      };
    }
    case 'friend/set-filter': {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.filter,
        },
      };
    }
    case 'friend/unfriend': {
      const friendInfo = state.friendInfo;
      if (isLoaded(friendInfo)) {
        const user = friendInfo[action.userId];
        return {
          ...state,
          friendInfo: {
            ...friendInfo,
            [action.userId]: { ...user, isFriend: false },
          },
        };
      }
      return state;
    }
    case 'friend/reset': {
      return INITIAL_FRIEND_INFO_STATE;
    }
  }
  return state;
}
