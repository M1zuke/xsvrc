import { isLoaded } from '../../api/prepare';
import { INITIAL_USER_STATE, UserState } from './state';
import { UserActions } from './types';

export function reducer(state: UserState = INITIAL_USER_STATE, action: UserActions): UserState {
  switch (action.type) {
    case 'user/set-avatars': {
      return {
        ...state,
        avatars: action.avatarInfo,
      };
    }
    case 'user/remove-avatar': {
      const avatars = state.avatars;
      if (isLoaded(avatars)) {
        return {
          ...state,
          avatars: [...avatars.filter((a) => a.id !== action.avatarId)],
        };
      }
      return state;
    }
    case 'user/update-avatar': {
      const avatars = state.avatars;
      if (isLoaded(avatars)) {
        return {
          ...state,
          avatars: avatars.map((a) => (a.id === action.avatarInfo.id ? action.avatarInfo : a)),
        };
      }
      return state;
    }
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
    case 'user/remove-notification': {
      if (isLoaded(state.notifications)) {
        return {
          ...state,
          notifications: [...state.notifications.filter((not) => not.id !== action.notificationId)],
        };
      }
      return state;
    }
    case 'user/set-favorites': {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          favoriteUsers: action.favorites,
        },
      };
    }
    case 'user/add-favorite': {
      const favoriteUsers = state.favorites.favoriteUsers;
      if (isLoaded(favoriteUsers)) {
        const favoriteFromGroup = favoriteUsers.friend[action.favorite.tags[0]] || [];
        return {
          ...state,
          favorites: {
            ...state.favorites,
            favoriteUsers: {
              ...favoriteUsers,
              friend: {
                ...favoriteUsers.friend,
                [action.favorite.tags[0]]: [...favoriteFromGroup, action.favorite],
              },
            },
          },
        };
      }
      return state;
    }
    case 'user/remove-favorite': {
      const favoriteUsers = state.favorites.favoriteUsers;
      if (isLoaded(favoriteUsers)) {
        const favoriteFromGroup = favoriteUsers.friend[action.favorite.tags[0]] || [];
        return {
          ...state,
          favorites: {
            ...state.favorites,
            favoriteUsers: {
              ...favoriteUsers,
              friend: {
                ...favoriteUsers.friend,
                [action.favorite.tags[0]]: favoriteFromGroup.filter((f) => f.id !== action.favorite.id),
              },
            },
          },
        };
      }
      return state;
    }
    case 'user/set-moderations': {
      return {
        ...state,
        moderations: action.moderations,
      };
    }
    case 'user/set-favorite-groups': {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          favoriteGroupNames: action.favoriteGroups,
        },
      };
    }
    case 'user/reset': {
      return INITIAL_USER_STATE;
    }
  }
  return state;
}
