import { CombinedState, combineReducers, Reducer } from 'redux';
import { AppAction, AppActionsType } from './actions';
import { AppState } from './index';

import { reducer as user } from './user/reducer';

export function createRootReducer(): Reducer<CombinedState<AppState>, AppAction<AppActionsType>> {
  return combineReducers<AppState>({
    userState: user,
  });
}
