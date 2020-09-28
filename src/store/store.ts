import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { AppAction, AppActionsType } from './actions';
import { AppState } from './index';
import { createRootReducer } from './reducer';

export function createAppStore(state?: AppState): Store<AppState, AppAction<AppActionsType>> {
  const rootReducer = createRootReducer();

  const middleware =
    process.env['REACT_APP_STORE_LOG'] === 'true' ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk);
  return createStore(rootReducer, state, middleware);
}
