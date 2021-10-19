import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import createMigrate from 'redux-persist/es/createMigrate';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { AppAction, AppActionsType } from './actions';
import { AppState } from './index';
import { migrations } from './migrations';
import { createRootReducer } from './reducer';

const persistConfig: PersistConfig<AppState> = {
  key: 'store',
  storage: storage,
  version: 1,
  whitelist: ['persisted'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  migrate: createMigrate(migrations, { debug: true }),
};

export function createAppStore(state?: AppState): Store<AppState, AppAction<AppActionsType>> {
  const rootReducer = createRootReducer();

  console.log(process.env['REACT_APP_STORE_LOG']);
  /* istanbul ignore next */
  const middleware =
    process.env['REACT_APP_STORE_LOG'] === 'true' ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk);

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return createStore(persistedReducer, state, middleware);
}
