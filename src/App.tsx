import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import './App.css';
import { Login } from './components/login/login';
import { Overview } from './components/overview/overview';
import { SaveGuard } from './components/saveGuard/saveGuard';
import { electronFetch } from './services/utils.service';
import { updateApiConfig } from './store/apiConfig/actions';
import { selectApiKey } from './store/apiConfig/selectors';
import { store } from './store/store';
import { history } from './utils/history';

const App: React.FC = () => {

  const apiKey = useSelector(selectApiKey);
  if (!apiKey) {
    electronFetch<ApiConfig>({
      url: 'https://api.vrchat.cloud/api/1/config',
    })
    .then((result: ApiConfig) => {
      store.dispatch(updateApiConfig(result));
    });
  }


  return (
    <Router history={history}>
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
