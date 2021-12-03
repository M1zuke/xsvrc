import { AuthenticatedUserInfo, MappedFavoritesToType, NotificationContent, SortedModerations } from '../../api/types';
import { Loadable } from '../reducer';

export type UserState = {
  userInfo: Loadable<AuthenticatedUserInfo>;
  notifications: Loadable<NotificationContent[]>;
  favorites: Loadable<MappedFavoritesToType>;
  moderations: Loadable<SortedModerations>;
};

export const INITIAL_USER_STATE: UserState = {
  userInfo: null,
  notifications: null,
  favorites: null,
  moderations: null,
};
