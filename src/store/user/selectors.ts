import { AuthenticatedUserInfo, NotificationContent } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';

export const selectUserInfo = (state: AppState): Loadable<AuthenticatedUserInfo> => state.user.userInfo;
export const selectNotifications = (state: AppState): Loadable<NotificationContent[]> => state.user.notifications;
