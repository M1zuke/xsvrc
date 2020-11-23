import { ApiInfoActions, ApiInfoActionType } from './api-info/types';
import { CookieActions, CookieActionType } from './cookies/types';
import { FriendActions, FriendsActionType } from './friends/types';
import { UserActions, UserActionType } from './user/types';

export type AppActionsType = UserActionType | ApiInfoActionType | CookieActionType | FriendsActionType;

export interface AppAction<T extends AppActionsType> {
  type: T;
}

export type AppActions = ApiInfoActions | UserActions | CookieActions | FriendActions;
