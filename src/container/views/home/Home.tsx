import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { isOnline } from '../../../common/utils';
import { Content } from '../../../components/content/Content';
import { FriendFavoriteList } from '../../../components/friend-favorite-list/FriendFavoriteList';
import { LoadableContent } from '../../../components/loadable-content/LoadableContent';
import { Loading } from '../../../components/loading/Loading';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { selectFriendInfo } from '../../../store/friends/selectors';
import { selectFriendFavorites, selectNotifications, selectUserInfo } from '../../../store/user/selectors';
import styles from './Home.module.scss';
import { TitleBox } from './TitleBox';

export function Home(): ReactElement {
  const userInfo = useSelector(selectUserInfo);
  const friendInfo = useSelector(selectFriendInfo);
  const favorites = useSelector(selectFriendFavorites);
  const allNotifications = useSelector(selectNotifications);
  const messages = useMessages();

  const onlineFriends = useMemo(
    () => (isLoaded(friendInfo) ? Object.values(friendInfo) : []).filter((fi) => isOnline(fi)).length,
    [friendInfo],
  );

  const notifications = useMemo(() => (isLoaded(allNotifications) ? allNotifications : []), [allNotifications]);
  const friendRequests = useMemo(
    () => notifications.filter((not) => not.type === 'friendRequest').length,
    [notifications],
  );
  const invites = useMemo(() => notifications.filter((not) => not.type === 'invite').length, [notifications]);

  if (!isLoaded(userInfo) || !isLoaded(friendInfo) || !isLoaded(favorites)) {
    return (
      <Content translucent className={styles.FullScreen}>
        <Loading />
      </Content>
    );
  }

  return (
    <ScrollableContent className={styles.PaddingOverwrite} innerClassName={styles.Component} translucent>
      <div className={styles.NumberOverview}>
        <TitleBox title={messages.Views.Dashboard.Friends.Online}>{onlineFriends}</TitleBox>
        <TitleBox title={messages.Views.Dashboard.Friends.FriendRequests}>{friendRequests}</TitleBox>
        <TitleBox title={messages.Views.Dashboard.Friends.Invites}>{invites}</TitleBox>
      </div>
      <LoadableContent data={favorites}>
        {(data) => (
          <div className={styles.FriendFavorites}>
            <FriendFavoriteList favorites={data} />
          </div>
        )}
      </LoadableContent>
    </ScrollableContent>
  );
}
