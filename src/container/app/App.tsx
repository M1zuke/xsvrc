import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { useApi } from '../../api/use-api';
import { routes } from '../../common/routes';
import { useSubscribe } from '../../common/use-subscribe';
import { Header } from '../../components/header/Header';
import { Loading } from '../../components/loading/Loading';
import { Navigation } from '../../components/navigation/Navigation';
import { Secured } from '../../components/secured/Secured';
import { WebSockets } from '../../components/websockets/WebSockets';
import { selectUserInfo } from '../../store/user/selectors';
import styles from './App.module.scss';

const HomeComponent = lazy(() => import('../views/home/Home').then(({ Home }) => ({ default: Home })));
const FriendComponent = lazy(() => import('../views/friends/Friends').then(({ Friends }) => ({ default: Friends })));
const FriendProfile = lazy(() =>
  import('../views/friends/friend-profile/FriendProfile').then(({ FriendProfile }) => ({ default: FriendProfile })),
);
const EventList = lazy(() =>
  import('../views/user-event-list/UserEventList').then(({ UserEventList }) => ({ default: UserEventList })),
);
const Notifications = lazy(() =>
  import('../views/notifications/Notifications').then(({ Notifications }) => ({ default: Notifications })),
);
const Settings = lazy(() => import('../views/settings/Settings').then(({ Settings }) => ({ default: Settings })));

const App: React.FC = () => {
  const userInfo = useSelector(selectUserInfo);
  const { info } = useApi();
  const { getUser, getAllFriends } = useApi();
  useSubscribe(getAllFriends, undefined, 240);
  useSubscribe(getUser, isLoaded(userInfo) ? userInfo.id : null, 60);

  useEffect(() => {
    info().then();
  }, [info]);

  return (
    <div className={styles.Component}>
      <Header />
      <div className={styles.Application}>
        <Navigation />
        <WebSockets />
        <Secured>
          <div className={styles.PageContent}>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route {...routes.home.config} component={HomeComponent} />
                <Route {...routes.friends.config} component={FriendComponent} />
                <Route {...routes.friendsProfile.config} component={FriendProfile} />
                <Route {...routes.eventList.config} component={EventList} />
                <Route {...routes.notifications.config} component={Notifications} />
                <Route {...routes.settings.config} component={Settings} />
              </Switch>
            </Suspense>
          </div>
        </Secured>
      </div>
    </div>
  );
};

export default App;
