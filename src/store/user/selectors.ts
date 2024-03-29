import merge from 'lodash.merge';
import { isLoaded } from '../../api/prepare';
import {
  AuthenticatedUserInfo,
  AvatarInfo,
  FavoriteGroup,
  FavoriteType,
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
import { sortByDate } from './actions';

export const selectAvatars = (state: AppState): Loadable<AvatarInfo[]> => state.user.avatars;
export const selectUserInfo = (state: AppState): Loadable<AuthenticatedUserInfo> => state.user.userInfo;
export const selectNotifications = (state: AppState): Loadable<NotificationContent[]> => state.user.notifications;
export const selectFavoriteUsers = (state: AppState): Loadable<MappedFavoritesToType> =>
  state.user.favorites.favoriteUsers;
export const selectFriendFavorites = (state: AppState): Loadable<MappedFavoritesToGroupWithUser> => {
  if (isLoaded(state.user.favorites.favoriteUsers)) {
    const filteredByType = state.user.favorites.favoriteUsers['friend'];
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

  return state.user.favorites.favoriteUsers === 'loading' ? 'loading' : 'not-found';
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

// export type IsUserInAFavoriteGroup = {
//   group: FriendFavoriteGroup;
//   favId: Favorite['id'];
//   uid: UserInfo['id'];
//   groupName: string;
// };

export const GetFavoriteOfUser =
  (userId: string) =>
  (state: AppState): NamedFavorite | null => {
    const favoriteUsers = state.user.favorites.favoriteUsers;
    const userInfo = state.user.userInfo;
    if (isLoaded(favoriteUsers) && isLoaded(userInfo)) {
      return Object.keys(favoriteUsers.friend)
        .flatMap((key) =>
          (favoriteUsers.friend[key] ?? []).map((fav) => {
            if (fav.favoriteId === userId) {
              return {
                ...fav,
                groupName: GetFavoriteGroupNameByGroupTag('friend', key)(state),
              };
            }
            return null;
          }),
        )
        .filter((u) => u !== null)[0];
    }
    return null;
  };

export const GetModerationsByUserId =
  (id: Moderation['targetUserId']) =>
  (state: AppState): Moderation[] => {
    if (isLoaded(state.user.moderations)) {
      return state.user.moderations.filter((m) => m.targetUserId === id);
    }
    return [];
  };

export const GetFavoriteGroups =
  (favoriteType: FavoriteType) =>
  (state: AppState): FavoriteGroup[] => {
    const favoriteGroupNames = state.user.favorites.favoriteGroupNames;
    if (isLoaded(favoriteGroupNames)) {
      return favoriteGroupNames[favoriteType];
    }
    return [];
  };

export const GetFavoriteGroupNameByGroupTag =
  (favoriteType: FavoriteType, tag: string) =>
  (state: AppState): string => {
    const favoriteGroups = GetFavoriteGroups(favoriteType)(state);
    return favoriteGroups.find((fg) => fg.name === tag)?.displayName ?? '';
  };

type MappedAllModerationToUser = {
  [userId: string]: {
    [type: string]: Moderation;
  };
};

export type MappedModeration = {
  created: string;
  moderations: Moderation[];
  displayName: string;
  targetUserId: string;
};

export const GetModerations = (state: AppState): Moderation[] => {
  if (isLoaded(state.user.moderations)) {
    return state.user.moderations;
  }
  return [];
};

export function mapModerations(moderations: Moderation[]): MappedModeration[] {
  const mappedModeration: MappedAllModerationToUser = merge(
    {},
    ...moderations.map((m) => ({
      [m.targetUserId]: { [m.type]: m },
    })),
  );

  const asArray: SortedModerations = Object.assign(
    {},
    ...Object.keys(mappedModeration).map((id) => {
      return {
        [id]: Object.values(mappedModeration[id]),
      };
    }),
  );

  return Object.keys(asArray)
    .map((id) => {
      const entries = asArray[id].sort(sortByDate);
      const getLatestTime = [...entries].shift();
      return {
        displayName: getLatestTime?.targetDisplayName || '',
        created: getLatestTime?.created || '',
        targetUserId: getLatestTime?.targetUserId || '',
        moderations: entries,
      } as MappedModeration;
    })
    .sort(sortByDate);
}
