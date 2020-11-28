import { FriendInfoState, INITIAL_FRIEND_INFO_STATE } from './state';
import { FriendActions } from './types';

export function reducer(state: FriendInfoState = INITIAL_FRIEND_INFO_STATE, action: FriendActions): FriendInfoState {
  switch (action.type) {
    case 'friend/setFriendInfo': {
      if (!action.offline) {
        return {
          ...state,
          active: action.friendInfo,
        };
      }
      return {
        ...state,
        offline: action.friendInfo,
      };
    }
    case 'friend/setCachedUser': {
      return {
        ...state,
        cachedUsers: {
          ...state.cachedUsers,
          [action.id]: action.userInfo,
        },
      };
    }
  }
  return state;
}
