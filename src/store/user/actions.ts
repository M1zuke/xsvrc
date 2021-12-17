import merge from 'lodash.merge';
import { isLoaded } from '../../api/prepare';
import {
  AuthenticatedUserInfo,
  Favorite,
  FavoriteGroup,
  MappedFavoritesToType,
  Moderation,
  NamedFavorite,
  NotificationContent,
  SortedModerations,
} from '../../api/types';
import { Loadable } from '../reducer';
import {
  AddFavorite,
  AddNotification,
  RemoveFavorite,
  ResetUser,
  SetFavoriteGroups,
  SetFavorites,
  SetModerations,
  SetNotifications,
  SetUserInfo,
} from './types';

export function setUserInfo(vrcUserInfo: Loadable<AuthenticatedUserInfo>): SetUserInfo {
  return {
    type: 'user/set-user-info',
    userInfo: vrcUserInfo,
  };
}

export function setNotifications(notifications: Loadable<NotificationContent[]>): SetNotifications {
  return {
    type: 'user/set-notifications',
    notifications,
  };
}

export function addNotification(notification: NotificationContent): AddNotification {
  return {
    type: 'user/add-notification',
    notification,
  };
}

export function resetUser(): ResetUser {
  return {
    type: 'user/reset',
  };
}

export function setFavorites(favorites: Loadable<MappedFavoritesToType>): SetFavorites {
  return {
    type: 'user/set-favorites',
    favorites,
  };
}

export function addFavorite(favorite: Favorite): AddFavorite {
  return {
    type: 'user/add-favorite',
    favorite,
  };
}

export function removeFavorite(favorite: NamedFavorite | Favorite): RemoveFavorite {
  return {
    type: 'user/remove-favorite',
    favorite,
  };
}

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

export function setModerations(moderations: Loadable<Moderation[]>): SetModerations {
  if (isLoaded(moderations)) {
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

    const sortedByDate: MappedModeration[] = Object.keys(asArray)
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

    return {
      type: 'user/set-moderations',
      moderations: sortedByDate,
    };
  }

  return {
    type: 'user/set-moderations',
    moderations,
  };
}

export function setFavoriteGroups(favoriteGroups: FavoriteGroup[]): SetFavoriteGroups {
  return {
    type: 'user/set-favorite-groups',
    favoriteGroups: {
      friend: favoriteGroups.filter((fg) => fg.type === 'friend').sort(sortByName),
      world: favoriteGroups.filter((fg) => fg.type === 'world').sort(sortByName),
      avatar: favoriteGroups.filter((fg) => fg.type === 'avatar').sort(sortByName),
    },
  };
}

function sortByName(a: FavoriteGroup, b: FavoriteGroup): number {
  return a.name.localeCompare(b.name);
}

function sortByDate(a: Moderation | MappedModeration, b: Moderation | MappedModeration): number {
  return +new Date(b.created) - +new Date(a.created);
}
