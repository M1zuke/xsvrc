import {
  AuthenticatedUserInfo,
  Favorite,
  MappedFavoritesToType,
  NamedFavorite,
  NotificationContent,
} from '../../api/types';
import { Loadable } from '../reducer';
import {
  AddFavorite,
  AddNotification,
  RemoveFavorite,
  ResetUser,
  SetFavorites,
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
