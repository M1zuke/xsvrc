import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { routes } from '../../common/routes';
import { useMessages } from '../../i18n';
import { selectCachedUser } from '../../store/friends/selectors';
import { vrcUserInfo } from '../../store/user/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import { FriendOverview } from '../friend-overview/FriendOverview';
import styles from './UserOverview.module.scss';

export function UserOverview(): ReactElement {
  const authenticatedUser = useSelector(vrcUserInfo);
  const messages = useMessages();
  const history = useHistory();
  const cachedUser = useSelector(selectCachedUser(isLoaded(authenticatedUser) ? authenticatedUser.id : 'none'));

  const navigateTo = useCallback(
    (url: string) => {
      history.push(url);
    },
    [history],
  );

  const isActiveRoute = useCallback((route: string) => history.location.pathname === route, [
    history.location.pathname,
  ]);

  if (!isLoaded(cachedUser)) {
    return <></>;
  }

  return (
    <Content className={styles.Component}>
      <FriendOverview friendInfo={cachedUser} />
      <div className={styles.Navigation}>
        <Button
          aria-label="navigate to home"
          active={isActiveRoute(routes.home.path)}
          onClick={() => navigateTo(routes.home.path)}
        >
          {messages.Views.Overview.Navigation.Home.Title}
        </Button>
        <Button
          aria-label="navigate to friends"
          active={isActiveRoute(routes.friends.path)}
          onClick={() => navigateTo(routes.friends.path)}
        >
          {messages.Views.Overview.Navigation.Friends.Title}
        </Button>
      </div>
    </Content>
  );
}