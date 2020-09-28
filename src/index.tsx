import { IpcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import { createAppStore } from './store/store';

type IWindow = Window & {
  ipcRenderer: IpcRenderer;
};

export const IpcRenderer = ((window as unknown) as IWindow).ipcRenderer;
const store = createAppStore();

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
