import {
  Home,
  List,
  Notifications,
  PeopleAlt,
  Person,
  PowerSettingsNew,
  Search,
  Settings,
  Shield,
} from '@mui/icons-material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { useApi } from '../../api/use-api';
import { routes } from '../../common/routes';
import { selectFriendInfo } from '../../store/friends/selectors';
import { selectFavorites, selectNotifications, selectUserInfo } from '../../store/user/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './Navigation.module.scss';

export function Navigation(): ReactElement {
  const userInfo = useSelector(selectUserInfo);
  const notifications = useSelector(selectNotifications);
  const friendInfo = useSelector(selectFriendInfo);
  const favorites = useSelector(selectFavorites);
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useApi();

  const userId = useMemo(() => (isLoaded(userInfo) ? userInfo.id : 'none'), [userInfo]);

  const navigateTo = useCallback(
    (url: string) => {
      history.push(url);
    },
    [history],
  );
  const doLogout = useCallback(() => logout().finally(), [logout]);
  const notificationsBadge = useMemo(() => (isLoaded(notifications) ? notifications.length : 0), [notifications]);
  const isActiveRoute = useCallback((route: string) => pathname === route, [pathname]);

  if (!isLoaded(friendInfo) || !isLoaded(userInfo) || !isLoaded(notifications) || !isLoaded(favorites)) {
    return <div />;
  }

  return (
    <Content className={styles.Component}>
      <div className={styles.Navigation}>
        <Button
          aria-label="navigate to home"
          active={isActiveRoute(routes.home.path)}
          onClick={() => navigateTo(routes.home.path)}
          icon
        >
          <Home />
        </Button>
        <Button
          aria-label="navigate to friends-profile"
          active={isActiveRoute(`${routes.friendsProfile.path}/${userId}`)}
          onClick={() => navigateTo(`${routes.friendsProfile.path}/${userId}`)}
          icon
        >
          <Person />
        </Button>
        <Button
          aria-label="navigate to friends"
          active={isActiveRoute(routes.friends.path)}
          onClick={() => navigateTo(routes.friends.path)}
          icon
        >
          <PeopleAlt />
        </Button>
        <Button
          aria-label="navigate to moderations"
          active={isActiveRoute(routes.moderation.path)}
          onClick={() => navigateTo(routes.moderation.path)}
          icon
        >
          <Shield />
        </Button>
        <Button
          aria-label="navigate to notifications"
          active={isActiveRoute(routes.notifications.path)}
          onClick={() => navigateTo(routes.notifications.path)}
          badge={notificationsBadge}
          icon
        >
          <Notifications />
        </Button>
        <Button
          aria-label="navigate to event-list"
          active={isActiveRoute(routes.eventList.path)}
          onClick={() => navigateTo(routes.eventList.path)}
          icon
        >
          <List />
        </Button>
        <Button
          aria-label="navigate to user search"
          active={isActiveRoute(routes.userSearch.path)}
          onClick={() => navigateTo(routes.userSearch.path)}
          icon
          disabled
        >
          <Search />
        </Button>
      </div>
      <div className={styles.Settings}>
        <Button
          aria-label="navigate to settings"
          active={isActiveRoute(routes.settings.path)}
          onClick={() => navigateTo(routes.settings.path)}
          icon
        >
          <Settings />
        </Button>
        <Button aria-label="navigate to settings" onClick={() => doLogout()} icon>
          <PowerSettingsNew className={styles.LogoutButton} />
        </Button>
      </div>
    </Content>
  );
}
