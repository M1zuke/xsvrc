import { Action } from 'redux';
import {
  AuthenticatedUserInfo,
  AvatarInfo,
  Favorite,
  MappedFavoritesToType,
  Moderation,
  ModerationType,
  NamedFavorite,
  NotificationContent,
  UserInfo,
} from '../../api/types';
import { Loadable } from '../reducer';
import { FavoriteGroupByType } from './state';

export type UserActionType = `user/${
  | 'set-user-info'
  | 'set-notifications'
  | 'add-notification'
  | 'remove-notification'
  | 'reset'
  | 'set-favorites'
  | 'add-favorite'
  | 'remove-favorite'
  | 'set-moderations'
  | 'add-moderation'
  | 'delete-moderation'
  | 'set-favorite-groups'
  | 'set-avatars'
  | 'remove-avatar'
  | 'update-avatar'}`;

export type UserAction<T extends UserActionType> = Action<T>;

export type SetUserInfo = UserAction<'user/set-user-info'> & {
  userInfo: Loadable<AuthenticatedUserInfo>;
};

export type SetNotifications = UserAction<'user/set-notifications'> & {
  notifications: Loadable<NotificationContent[]>;
};

export type AddNotification = UserAction<'user/add-notification'> & {
  notification: NotificationContent;
};
export type RemoveNotification = UserAction<'user/remove-notification'> & {
  notificationId: NotificationContent['id'];
};

export type SetFavorites = UserAction<'user/set-favorites'> & {
  favorites: Loadable<MappedFavoritesToType>;
};

export type AddFavorite = UserAction<'user/add-favorite'> & {
  favorite: Favorite;
};

export type RemoveFavorite = UserAction<'user/remove-favorite'> & {
  favorite: NamedFavorite | Favorite;
};

export type SetModerations = UserAction<'user/set-moderations'> & {
  moderations: Loadable<Moderation[]>;
};
export type AddModeration = UserAction<'user/add-moderation'> & {
  moderation: Moderation;
};
export type DeleteModeration = UserAction<'user/delete-moderation'> & {
  userId: UserInfo['id'];
  moderationType: ModerationType;
};

export type SetFavoriteGroups = UserAction<'user/set-favorite-groups'> & {
  favoriteGroups: Loadable<FavoriteGroupByType>;
};

export type SetAvatars = UserAction<'user/set-avatars'> & {
  avatarInfo: Loadable<AvatarInfo[]>;
};

export type UpdateAvatar = UserAction<'user/update-avatar'> & {
  avatarInfo: AvatarInfo;
};

export type RemoveAvatar = UserAction<'user/remove-avatar'> & {
  avatarId: AvatarInfo['id'];
};

export type ResetUser = UserAction<'user/reset'>;

export type UserActions =
  | SetUserInfo
  | SetNotifications
  | AddNotification
  | ResetUser
  | SetFavorites
  | AddFavorite
  | RemoveFavorite
  | SetModerations
  | AddModeration
  | DeleteModeration
  | SetFavoriteGroups
  | SetAvatars
  | UpdateAvatar
  | RemoveAvatar
  | RemoveNotification;
