import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'store',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(
  createLogger(),
));
export const persistor = persistStore(store);

