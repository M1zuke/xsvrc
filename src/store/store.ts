import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { AppAction, AppActionsType } from './actions';
import { AppState } from './index';
import { createRootReducer } from './reducer';

const persistConfig = {
  key: 'store',
  storage: storage,
  whitelist: ['cookies'],
};

export function createAppStore(state?: AppState): Store<AppState, AppAction<AppActionsType>> {
  const rootReducer = createRootReducer();

  /* istanbul ignore next */
  const middleware =
    process.env['REACT_APP_STORE_LOG'] === 'true' ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk);

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(persistedReducer, state, middleware);
}
