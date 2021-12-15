import { getFavoriteGroupNames } from '../../api/friends-api';
import { isLoaded } from '../../api/prepare';
import {
  AuthenticatedUserInfo,
  Favorite,
  FriendFavoriteGroup,
  FriendFavoriteGroups,
  MappedFavoritesToGroupWithUser,
  MappedFavoritesToType,
  Moderation,
  NamedFavorite,
  NotificationContent,
  SortedModerations,
  UserInfo,
} from '../../api/types';
import { isOffline } from '../../common/utils';
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
          [keys[index]]: (values || [])
            .map((fav) => {
              if (isLoaded(state.friends.friendInfo)) {
                return state.friends.friendInfo[fav.favoriteId] ?? fav.favoriteId;
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

  if (isOffline(a) && isOffline(b)) {
    return 0;
  }

  if (isOffline(b)) {
    return -1;
  }

  if (isOffline(a)) {
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

export type IsUserInAFavoriteGroup = {
  group: FriendFavoriteGroup;
  favId: Favorite['id'];
  uid: UserInfo['id'];
  groupName: string;
};

export const GetFavoriteOfUser =
  (userId: string) =>
  (state: AppState): NamedFavorite | null => {
    const favorites = state.user.favorites;
    const userInfo = state.user.userInfo;
    if (isLoaded(favorites) && isLoaded(userInfo)) {
      return Object.keys(favorites.friend)
        .flatMap((key) =>
          (favorites.friend[key as FriendFavoriteGroup] ?? []).map((fav) => {
            if (fav.favoriteId === userId) {
              return {
                ...fav,
                groupName: getFavoriteGroupNames(userInfo.friendGroupNames)[
                  FriendFavoriteGroups.indexOf(key as FriendFavoriteGroup)
                ],
              };
            }
            return null;
          }),
        )
        .filter((u) => u !== null)[0];
    }
    return null;
  };

export const GetSortedModerations = (state: AppState): SortedModerations => {
  if (isLoaded(state.user.moderations)) {
    return state.user.moderations;
  }
  return {};
};

export const GetModerationsByUserId =
  (id: Moderation['targetUserId']) =>
  (state: AppState): Moderation[] => {
    if (isLoaded(state.user.moderations)) {
      return state.user.moderations[id] ?? [];
    }
    return [];
  };
