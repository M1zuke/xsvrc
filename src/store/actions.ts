import { UserActions } from './user/types';

export type AppActionsType = UserActions;

export interface AppAction<T extends AppActionsType> {
  type: T;
}

export type AppActions = UserActions;
