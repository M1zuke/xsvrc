import { isLoaded } from '../../api/prepare';
import { FriendInfoState, INITIAL_FRIEND_INFO_STATE } from './state';
import { FriendActions } from './types';

export function reducer(state: FriendInfoState = INITIAL_FRIEND_INFO_STATE, action: FriendActions): FriendInfoState {
  switch (action.type) {
    case 'friend/setFriendInfo': {
      return action.friendInfo;
    }
    case 'friend/setFriendById': {
      if (isLoaded(state)) {
        return {
          ...state,
          [action.id]: { ...state[action.id], ...action.userInfo },
        };
      }
      return {
        [action.id]: action.userInfo,
      };
    }
  }
  return state;
}
