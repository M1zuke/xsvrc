import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './container/app/App';
import './index.scss';
import { createAppStore } from './store/store';

/* istanbul ignore next */
const store = createAppStore();
/* istanbul ignore next */
const persistor = persistStore(store);

/* istanbul ignore next */
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
