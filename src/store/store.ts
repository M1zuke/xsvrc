import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';

const persistConfig = {
  key: 'store',
  storage: storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(
    createLogger(),
));
export const persistor = persistStore(store);

