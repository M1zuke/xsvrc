import { CombinedState, combineReducers, Reducer } from 'redux';
import { ErrorType } from '../common/electron-controls';
import { AppAction, AppActionsType } from './actions';
import { reducer as apiInfo } from './api-info/reducer';
import { reducer as friends } from './friends/reducer';
import { AppState } from './index';
import { reducer as persisted } from './persisted/reducer';
import { reducer as userEvents } from './user-events/reducer';

import { reducer as user } from './user/reducer';
import { reducer as view } from './view/reducer';
import { reducer as worlds } from './worlds/reducer';

export type Loadable<T> = T | 'loading' | 'not-found' | ErrorType | null;

export function isErrorType<T>(obj?: Loadable<T>): obj is ErrorType {
  if (typeof obj === 'undefined' || typeof obj === 'string' || obj === null) {
    return false;
  }
  return 'type' in obj && 'message' in obj;
}

export function createRootReducer(): Reducer<CombinedState<AppState>, AppAction<AppActionsType>> {
  return combineReducers<AppState>({
    user,
    apiInfo,
    view,
    persisted,
    friends,
    userEvents,
    worlds,
  });
}
