import { ApiInfoActions, ApiInfoActionType } from './api-info/types';
import { FriendActions, FriendsActionType } from './friends/types';
import { HistoryActions, HistoryActionTypes } from './history/types';
import { PersistedActions, PersistedActionType } from './persisted/types';
import { UserEventActions, UserEventActionType } from './user-events/types';
import { UserActions, UserActionType } from './user/types';
import { ViewActions, ViewActionTypes } from './view/types';
import { WorldsActions, WorldsActionType } from './worlds/types';

export type AppActionsType =
  | UserActionType
  | ApiInfoActionType
  | PersistedActionType
  | FriendsActionType
  | UserEventActionType
  | WorldsActionType
  | ViewActionTypes
  | HistoryActionTypes;

export interface AppAction<T extends AppActionsType> {
  type: T;
}

export type AppActions =
  | ApiInfoActions
  | UserActions
  | PersistedActions
  | FriendActions
  | UserEventActions
  | WorldsActions
  | ViewActions
  | HistoryActions;
