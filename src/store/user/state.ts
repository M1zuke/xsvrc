import { AuthenticatedUserInfo, NotificationDTO } from '../../api/types';
import { Loadable } from '../reducer';

export type UserState = {
  userInfo: Loadable<AuthenticatedUserInfo>;
  notifications: Loadable<NotificationDTO[]>;
};

export const INITIAL_USER_STATE: UserState = {
  userInfo: null,
  notifications: null,
};
