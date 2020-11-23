import { CombinedState, combineReducers, Reducer } from 'redux';
import { ErrorType } from '../common/electron-fetch';
import { AppAction, AppActionsType } from './actions';
import { reducer as apiInfo } from './api-info/reducer';
import { AppState } from './index';

import { reducer as userState } from './user/reducer';
import { reducer as view } from './view/reducer';
import { reducer as cookies } from './cookies/reducer';
import { reducer as friends } from './friends/reducer';

export type Loadable<T> = T | 'loading' | ErrorType | null;

export function isErrorType<T>(obj?: Loadable<T>): obj is ErrorType {
  if (typeof obj === 'undefined' || typeof obj === 'string' || obj === null) {
    return false;
  }
  return 'type' in obj && 'message' in obj;
}

export function createRootReducer(): Reducer<CombinedState<AppState>, AppAction<AppActionsType>> {
  return combineReducers<AppState>({
    userInfo: userState,
    apiInfo,
    view,
    cookies,
    friends,
  });
}
