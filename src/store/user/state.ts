import { AuthenticatedUserInfo, MappedFavoritesToType, NotificationContent } from '../../api/types';
import { Loadable } from '../reducer';

export type UserState = {
  userInfo: Loadable<AuthenticatedUserInfo>;
  notifications: Loadable<NotificationContent[]>;
  favorites: Loadable<MappedFavoritesToType>;
};

export const INITIAL_USER_STATE: UserState = {
  userInfo: null,
  notifications: null,
  favorites: null,
};
