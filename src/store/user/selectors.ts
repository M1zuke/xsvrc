import { AuthenticatedUserInfo, NotificationDTO } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';

export const selectUserInfo = (state: AppState): Loadable<AuthenticatedUserInfo> => state.user.userInfo;
export const selectNotifications = (state: AppState): Loadable<NotificationDTO[]> => state.user.notifications;
