import {
  AuthenticatedUserInfo,
  AvatarInfo,
  FavoriteGroup,
  FavoriteType,
  MappedFavoritesToType,
  Moderation,
  NotificationContent,
} from '../../api/types';
import { Loadable } from '../reducer';

export type FavoriteGroupByType = Record<FavoriteType, FavoriteGroup[]>;

export type Favorites = {
  favoriteUsers: Loadable<MappedFavoritesToType>;
  favoriteGroupNames: Loadable<FavoriteGroupByType>;
};

export type UserState = {
  userInfo: Loadable<AuthenticatedUserInfo>;
  notifications: Loadable<NotificationContent[]>;
  favorites: Favorites;
  moderations: Loadable<Moderation[]>;
  avatars: Loadable<AvatarInfo[]>;
};

export const INITIAL_USER_STATE: UserState = {
  userInfo: null,
  notifications: null,
  favorites: {
    favoriteUsers: null,
    favoriteGroupNames: null,
  },
  moderations: null,
  avatars: null,
};
