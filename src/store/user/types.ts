import { Action } from 'redux';
import {
  AuthenticatedUserInfo,
  Favorite,
  MappedFavoritesToType,
  NamedFavorite,
  NotificationContent,
  SortedModerations,
} from '../../api/types';
import { Loadable } from '../reducer';

export type UserActionType = `user/${
  | 'set-user-info'
  | 'set-notifications'
  | 'add-notification'
  | 'reset'
  | 'set-favorites'
  | 'add-favorite'
  | 'remove-favorite'
  | 'set-moderations'}`;

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
  moderations: Loadable<SortedModerations>;
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
  | SetModerations;
