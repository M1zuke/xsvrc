import { AuthenticatedUserInfo, NotificationContent } from '../../api/types';
import { Loadable } from '../reducer';
import { AddNotification, ResetUser, SetNotifications, SetUserInfo } from './types';

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
