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
    case 'friend/set-non-friend': {
      return {
        ...state,
        nonFriendInfo: action.userInfo,
      };
    }
    case 'friend/reset': {
      return INITIAL_FRIEND_INFO_STATE;
    }
  }
  return state;
}
