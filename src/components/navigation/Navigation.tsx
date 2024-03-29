import {
  Face,
  Home,
  List,
  MonetizationOn,
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
import { selectFavoriteUsers, selectNotifications, selectUserInfo } from '../../store/user/selectors';
import { setModal } from '../../store/view/actions';
import { useAppDispatch } from '../../thunk/dispatch';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './Navigation.module.scss';

export function Navigation(): ReactElement {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);
  const notifications = useSelector(selectNotifications);
  const friendInfo = useSelector(selectFriendInfo);
  const favorites = useSelector(selectFavoriteUsers);
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
    <Content className={styles.Component} translucent noPadding>
      <Content className={styles.NavigationTop}>
        <Button
          aria-label="navigate to home"
          active={isActiveRoute(routes.home.path)}
          onClick={() => navigateTo(routes.home.path)}
          icon
        >
          <Home />
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
      </Content>

      <Content className={styles.NavigationCenter}>
        <Button
          aria-label="navigate to friends-profile"
          onClick={() => dispatch(setModal({ type: 'friend-profile', userId: userId }))}
          icon
        >
          <Person />
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
          aria-label="navigate to transactions"
          active={isActiveRoute(routes.transactions.path)}
          onClick={() => navigateTo(routes.transactions.path)}
          icon
          disabled
        >
          <MonetizationOn />
        </Button>
        <Button
          aria-label="navigate to avatars"
          active={isActiveRoute(routes.avatar.path)}
          onClick={() => navigateTo(routes.avatar.path)}
          icon
        >
          <Face />
        </Button>
        <Button
          aria-label="navigate to moderations"
          active={isActiveRoute(routes.moderation.path)}
          onClick={() => navigateTo(routes.moderation.path)}
          icon
        >
          <Shield />
        </Button>
      </Content>
      <Content className={styles.Settings}>
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
      </Content>
    </Content>
  );
}
