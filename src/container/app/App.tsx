import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useApi } from '../../api/use-api';
import { routes } from '../../common/routes';
import { Loading } from '../../components/loading/Loading';
import { Secured } from '../../components/secured/Secured';
import { UserOverview } from '../../components/user-overview/UserOverview';
import styles from './App.module.scss';

const HomeComponent = lazy(() => import('../views/home/Home').then(({ Home }) => ({ default: Home })));
const FriendComponent = lazy(() => import('../views/friends/Friends').then(({ Friends }) => ({ default: Friends })));

const App: React.FC = () => {
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);
  const { info } = useApi();

  useEffect(() => {
    info().then();
  }, [info]);

  useLayoutEffect(
    /* istanbul ignore next : implementation detail */ () => {
      return history.listen((location) => setPath(location.pathname));
    },
    [history],
  );

  return (
    <div className={styles.Component}>
      <div className={styles.FloatingPath}>{path}</div>
      <Secured>
        <div className={styles.PageContent}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route {...routes.home} component={HomeComponent} />
              <Route {...routes.friends} component={FriendComponent} />
            </Switch>
          </Suspense>
        </div>
        <UserOverview />
      </Secured>
    </div>
  );
};

export default App;
