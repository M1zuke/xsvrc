import { ApiInfoActions, ApiInfoActionType } from './api-info/types';
import { PersistedActions, PersistedActionType } from './persisted/types';
import { UserEventActions, UserEventActionType } from './user-events/types';
import { FriendActions, FriendsActionType } from './friends/types';
import { UserActions, UserActionType } from './user/types';
import { WorldsActions } from './worlds/types';

export type AppActionsType =
  | UserActionType
  | ApiInfoActionType
  | PersistedActionType
  | FriendsActionType
  | UserEventActionType
  | WorldsActions;

export interface AppAction<T extends AppActionsType> {
  type: T;
}

export type AppActions =
  | ApiInfoActions
  | UserActions
  | PersistedActions
  | FriendActions
  | UserEventActions
  | WorldsActions;
