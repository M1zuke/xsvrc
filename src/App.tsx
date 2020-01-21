import React from 'react';
import './App.css';
import { electronFetch } from './services/utils.service';
import { Route, Router, Switch } from 'react-router';
import { Login } from './components/login/login';
import { updateApiConfig } from './store/apiConfig/actions';
import { store } from './store/store';
import { history } from './utils/history';
import { SaveGuard } from './components/saveGuard/saveGuard';
import { Overview } from './components/overview/overview';

const App: React.FC = () => {

  electronFetch<ApiConfig>({
    url: 'https://api.vrchat.cloud/api/1/config',
  })
  .then((result: ApiConfig) => {
    store.dispatch(updateApiConfig(result));
    console.log(store.getState());
  });

  return (
      <Router history={ history }>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <SaveGuard>
            <Route path="/overview">
              <Overview />
            </Route>
          </SaveGuard>
        </Switch>
      </Router>
  );
};

export default App;
