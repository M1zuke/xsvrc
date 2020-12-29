import { AuthenticatedUserInfo, NotificationDTO } from '../../api/types';
import { Loadable } from '../reducer';
import { AddNotification, SetNotifications, SetUserInfo } from './types';

export function setUserInfo(vrcUserInfo: Loadable<AuthenticatedUserInfo>): SetUserInfo {
  return {
    type: 'user/set-user-info',
    userInfo: vrcUserInfo,
  };
}

export function setNotifications(notifications: Loadable<NotificationDTO[]>): SetNotifications {
  return {
    type: 'user/set-notifications',
    notifications,
  };
}
export function addNotification(notification: NotificationDTO): AddNotification {
  return {
    type: 'user/add-notification',
    notification,
  };
}
