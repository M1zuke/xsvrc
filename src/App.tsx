import React from 'react';
import './App.css';
import { electronFetch } from './services/utils.service';
import { store } from './index';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './components/login/login.component';
import { updateApiConfig } from './store/apiConfig/actions';

const App: React.FC = () => {

  electronFetch<ApiConfig>({
    url: 'https://api.vrchat.cloud/api/1/config',
  })
  .then((result: ApiConfig) => {
    store.dispatch(updateApiConfig(result));
    console.log(store.getState());
  });

  return (
      <BrowserRouter>
        <switch>
          <Route path="/">
            <Login/>
          </Route>
        </switch>
      </BrowserRouter>
  );
};

export default App;
