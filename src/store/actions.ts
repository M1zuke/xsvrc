import { ApiInfoActions, ApiInfoActionType } from './api-info/types';
import { CookieActions, CookieActionType } from './persisted/types';
import { UserEventActions, UserEventActionType } from './user-events/types';
import { FriendActions, FriendsActionType } from './friends/types';
import { UserActions, UserActionType } from './user/types';

export type AppActionsType =
  | UserActionType
  | ApiInfoActionType
  | CookieActionType
  | FriendsActionType
  | UserEventActionType;

export interface AppAction<T extends AppActionsType> {
  type: T;
}

export type AppActions = ApiInfoActions | UserActions | CookieActions | FriendActions | UserEventActions;
