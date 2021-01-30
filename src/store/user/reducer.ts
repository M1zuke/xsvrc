import { isLoaded } from '../../api/prepare';
import { INITIAL_USER_STATE, UserState } from './state';
import { UserActions } from './types';

export function reducer(state: UserState = INITIAL_USER_STATE, action: UserActions): UserState {
  switch (action.type) {
    case 'user/set-user-info': {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case 'user/set-notifications': {
      return {
        ...state,
        notifications: action.notifications,
      };
    }
    case 'user/add-notification': {
      if (isLoaded(state.notifications)) {
        return {
          ...state,
          notifications: [action.notification, ...state.notifications],
        };
      }
      return state;
    }
    case 'user/set-favorites': {
      return {
        ...state,
        favorites: action.favorites,
      };
    }
    case 'user/reset': {
      return INITIAL_USER_STATE;
    }
  }
  return state;
}
