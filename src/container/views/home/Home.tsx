import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { Loading } from '../../../components/loading/Loading';
import { useMessages } from '../../../i18n';
import { selectFriendInfo } from '../../../store/friends/selectors';
import { selectNotifications, selectUserInfo } from '../../../store/user/selectors';
import styles from './Home.module.scss';
import { TitleBox } from './TitleBox';

export function Home(): ReactElement {
  const userInfo = useSelector(selectUserInfo);
  const friendInfo = useSelector(selectFriendInfo);
  const allNotifications = useSelector(selectNotifications);
  const messages = useMessages();

  const onlineFriends = useMemo(
    () => (isLoaded(friendInfo) ? Object.values(friendInfo) : []).filter((fi) => fi.status !== 'offline').length,
    [friendInfo],
  );

  const notifications = useMemo(() => (isLoaded(allNotifications) ? allNotifications : []), [allNotifications]);
  const friendRequests = useMemo(() => notifications.filter((not) => not.type === 'friendRequest').length, [
    notifications,
  ]);
  const invites = useMemo(() => notifications.filter((not) => not.type === 'invite').length, [notifications]);

  if (userInfo === 'loading' || friendInfo === 'loading') {
    return <Loading />;
  }

  if (!isLoaded(userInfo)) {
    return <div>No Content</div>;
  }

  return (
    <div className={styles.Component}>
      <TitleBox title={messages.Views.Dashboard.Friends.Online}>{onlineFriends}</TitleBox>
      <TitleBox title={messages.Views.Dashboard.Friends.FriendRequests}>{friendRequests}</TitleBox>
      <TitleBox title={messages.Views.Dashboard.Friends.invites}>{invites}</TitleBox>
    </div>
  );
}
