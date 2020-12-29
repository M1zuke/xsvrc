import { Close, Home, List, Notifications, PeopleAlt } from '@material-ui/icons';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { IWindow } from '../../common/electron-fetch';
import { routes } from '../../common/routes';
import { selectFriendInfo, selectFriendInfoById } from '../../store/friends/selectors';
import { selectNotifications, selectUserInfo } from '../../store/user/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import { FriendOverview } from '../friend-overview/FriendOverview';
import styles from './UserOverview.module.scss';

export function UserOverview(): ReactElement {
  const authenticatedUser = useSelector(selectUserInfo);
  const notifications = useSelector(selectNotifications);
  const friendInfo = useSelector(selectFriendInfo);
  const history = useHistory();
  const { pathname } = useLocation();
  const cachedUser = useSelector(selectFriendInfoById(isLoaded(authenticatedUser) ? authenticatedUser.id : 'none'));

  const navigateTo = useCallback(
    (url: string) => {
      history.push(url);
    },
    [history],
  );

  const disableNavigation = useMemo(() => !isLoaded(friendInfo) && !isLoaded(notifications), [
    friendInfo,
    notifications,
  ]);

  const closeApplication = useCallback(() => ((window as unknown) as IWindow).ipcRenderer.invoke('close'), []);

  const notificationsBadge = useMemo(() => (isLoaded(notifications) ? notifications.length : 0), [notifications]);

  const isActiveRoute = useCallback((route: string) => pathname === route, [pathname]);

  return (
    <Content className={styles.Component}>
      <div className={styles.Navigation}>
        <Button
          aria-label="navigate to home"
          active={isActiveRoute(routes.home.path)}
          onClick={() => navigateTo(routes.home.path)}
          headerIcon
          disabled={disableNavigation}
        >
          <Home />
        </Button>
        <FriendOverview friendInfo={cachedUser} small />
        <Button
          aria-label="navigate to friends"
          active={isActiveRoute(routes.friends.path)}
          onClick={() => navigateTo(routes.friends.path)}
          headerIcon
          disabled={disableNavigation}
        >
          <PeopleAlt />
        </Button>{' '}
        <Button
          aria-label="navigate to friends"
          active={isActiveRoute(routes.notifications.path)}
          onClick={() => navigateTo(routes.notifications.path)}
          badge={notificationsBadge}
          headerIcon
          disabled={disableNavigation}
        >
          <Notifications />
        </Button>
        <Button
          aria-label="navigate to friends"
          active={isActiveRoute(routes.eventList.path)}
          onClick={() => navigateTo(routes.eventList.path)}
          headerIcon
          disabled={disableNavigation}
        >
          <List />
        </Button>
      </div>
      <Button onClick={closeApplication} aria-label="close application" headerIcon>
        <Close />
      </Button>
    </Content>
  );
}
