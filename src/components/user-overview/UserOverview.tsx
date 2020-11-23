import React, { ReactElement, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ifLoaded } from '../../api/prepare';
import { routes } from '../../common/routes';
import { useMessages } from '../../i18n';
import { vrcUserInfo } from '../../store/user/selectors';
import { Button } from '../button/Button';
import styles from './UserOverview.module.scss';

export function UserOverview(): ReactElement {
  const userInfo = useSelector(vrcUserInfo);
  const messages = useMessages();
  const history = useHistory();
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(${ifLoaded(userInfo) ? userInfo.currentAvatarThumbnailImageUrl : ''})`,
    }),
    [userInfo],
  );

  const navigateTo = useCallback(
    (url: string) => {
      history.push(url);
    },
    [history],
  );

  const isActiveRoute = useCallback((route: string) => history.location.pathname === route, [
    history.location.pathname,
  ]);

  if (!ifLoaded(userInfo)) {
    return <></>;
  }

  return (
    <div className={styles.Component}>
      <div style={backgroundStyle} className={styles.UserImage}>
        <div className={styles.UserName}>{userInfo.displayName}</div>
      </div>
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
    </div>
  );
}
