import { isLoaded } from '../../api/prepare';
import {
  AuthenticatedUserInfo,
  MappedFavoritesToGroupWithUser,
  MappedFavoritesToType,
  NotificationContent,
  UserInfo,
} from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';

export const selectUserInfo = (state: AppState): Loadable<AuthenticatedUserInfo> => state.user.userInfo;
export const selectNotifications = (state: AppState): Loadable<NotificationContent[]> => state.user.notifications;
export const selectFavorites = (state: AppState): Loadable<MappedFavoritesToType> => state.user.favorites;
export const selectFriendFavorites = (state: AppState): Loadable<MappedFavoritesToGroupWithUser> => {
  if (isLoaded(state.user.favorites)) {
    const filteredByType = state.user.favorites['friend'];
    if (filteredByType) {
      const keys = Object.keys(filteredByType);
      return Object.assign(
        {},
        ...Object.values(filteredByType).map((values, index) => ({
          [keys[index]]: values
            .map((id) => {
              if (isLoaded(state.friends.friendInfo)) {
                return state.friends.friendInfo[id] ?? id;
              }
              return 'not-found';
            })
            .sort(sortByName)
            .sort(sortByStatus),
        })),
      );
    }
  }

  return state.user.favorites === 'loading' ? 'loading' : 'not-found';
};

export const isLoggedIn = (state: AppState): boolean => {
  return isLoaded(state.user.userInfo) && isLoaded(state.apiInfo);
};

export const isLoggingIn = (state: AppState): boolean => {
  return state.user.userInfo === 'loading' || state.apiInfo === 'loading';
};

type UserOrNotFound = UserInfo | 'not-found';

function sortByStatus(a: UserOrNotFound, b: UserOrNotFound): number {
  if (typeof a === 'string') {
    return 1;
  }

  if (typeof b === 'string') {
    return 1;
  }

  if (a.status === 'offline' && b.status === 'offline') {
    return 0;
  }

  if (b.status === 'offline') {
    return -1;
  }

  if (a.status === 'offline') {
    return 1;
  }

  return 0;
}

function sortByName(a: UserOrNotFound, b: UserOrNotFound): number {
  if (typeof a === 'string' || typeof b === 'string') {
    return 0;
  }

  return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
}
