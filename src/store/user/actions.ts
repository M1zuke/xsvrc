import merge from 'lodash.merge';
import { isLoaded } from '../../api/prepare';
import {
  AuthenticatedUserInfo,
  Favorite,
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

type MappedModeration = {
  [userId: string]: {
    [type: string]: Moderation;
  };
};

export function setModerations(moderations: Loadable<Moderation[]>): SetModerations {
  if (isLoaded(moderations)) {
    const mappedModeration: MappedModeration = merge(
      {},
      ...moderations.map((m) => ({
        [m.targetUserId]: { [m.type]: m },
      })),
    );
    const asArray: SortedModerations = Object.assign(
      {},
      ...Object.keys(mappedModeration).map((id) => {
        const values = mappedModeration[id];
        return {
          [id]: Object.values(values),
        };
      }),
    );
    return {
      type: 'user/set-moderations',
      moderations: asArray,
    };
  }

  return {
    type: 'user/set-moderations',
    moderations,
  };
}
