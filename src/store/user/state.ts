import {
  AuthenticatedUserInfo,
  FavoriteGroup,
  FavoriteType,
  MappedFavoritesToType,
  NotificationContent,
} from '../../api/types';
import { Loadable } from '../reducer';
import { MappedModeration } from './actions';

export type FavoriteGroupByType = Record<FavoriteType, FavoriteGroup[]>;

export type Favorites = {
  favoriteUsers: Loadable<MappedFavoritesToType>;
  favoriteGroupNames: Loadable<FavoriteGroupByType>;
};

export type UserState = {
  userInfo: Loadable<AuthenticatedUserInfo>;
  notifications: Loadable<NotificationContent[]>;
  favorites: Favorites;
  moderations: Loadable<MappedModeration[]>;
};

export const INITIAL_USER_STATE: UserState = {
  userInfo: null,
  notifications: null,
  favorites: {
    favoriteUsers: null,
    favoriteGroupNames: null,
  },
  moderations: null,
};
