import { Action } from 'redux';
import { AuthenticatedUserInfo, NotificationDTO } from '../../api/types';
import { Loadable } from '../reducer';

export type UserActionType = 'user/set-user-info' | 'user/set-notifications' | 'user/add-notification';

export type UserAction<T extends UserActionType> = Action<T>;

export type SetUserInfo = UserAction<'user/set-user-info'> & {
  userInfo: Loadable<AuthenticatedUserInfo>;
};

export type SetNotifications = UserAction<'user/set-notifications'> & {
  notifications: Loadable<NotificationDTO[]>;
};

export type AddNotification = UserAction<'user/add-notification'> & {
  notification: NotificationDTO;
};

export type UserActions = SetUserInfo | SetNotifications | AddNotification;
