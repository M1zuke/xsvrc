import { Action } from 'redux';
import { AuthenticatedUserInfo, Favorite, MappedFavoritesToType, NotificationContent } from '../../api/types';
import { Loadable } from '../reducer';

export type UserActionType =
  | 'user/set-user-info'
  | 'user/set-notifications'
  | 'user/add-notification'
  | 'user/reset'
  | 'user/set-favorites';

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

export type ResetUser = UserAction<'user/reset'>;

export type UserActions = SetUserInfo | SetNotifications | AddNotification | ResetUser | SetFavorites;
