import {
  AuthenticatedUserInfo,
  AvatarInfo,
  Favorite,
  FavoriteGroup,
  MappedFavoritesToType,
  Moderation,
  ModerationType,
  NamedFavorite,
  NotificationContent,
  UserInfo,
} from '../../api/types';
import { Loadable } from '../reducer';
import { MappedModeration } from './selectors';
import {
  AddFavorite,
  AddModeration,
  AddNotification,
  DeleteModeration,
  RemoveAvatar,
  RemoveFavorite,
  RemoveNotification,
  ResetUser,
  SetAvatars,
  SetFavoriteGroups,
  SetFavorites,
  SetModerations,
  SetNotifications,
  SetUserInfo,
  UpdateAvatar,
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

export function setModerations(moderations: Loadable<Moderation[]>): SetModerations {
  return {
    type: 'user/set-moderations',
    moderations,
  };
}

export function addModeration(moderation: Moderation): AddModeration {
  return {
    type: 'user/add-moderation',
    moderation,
  };
}
export function deleteModeration(userId: UserInfo['id'], moderationType: ModerationType): DeleteModeration {
  return {
    type: 'user/delete-moderation',
    userId,
    moderationType,
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

export function sortByDate(a: Moderation | MappedModeration, b: Moderation | MappedModeration): number {
  return +new Date(b.created) - +new Date(a.created);
}

export function setAvatars(avatarInfo: Loadable<AvatarInfo[]>): SetAvatars {
  return {
    type: 'user/set-avatars',
    avatarInfo,
  };
}

export function updateAvatarInfo(avatarInfo: AvatarInfo): UpdateAvatar {
  return {
    type: 'user/update-avatar',
    avatarInfo,
  };
}

export function removeAvatarInfo(avatarId: AvatarInfo['id']): RemoveAvatar {
  return {
    type: 'user/remove-avatar',
    avatarId,
  };
}

export function removeNotification(notificationId: NotificationContent['id']): RemoveNotification {
  return {
    type: 'user/remove-notification',
    notificationId,
  };
}
