import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../api/types';
import { SubscriptionService } from '../../container/subscription-service/SubscriptionService';
import { WorldDetail } from '../../container/views/user-event-list/WorldDetail';
import { selectFriendInfoByLocation } from '../../store/friends/selectors';
import { FriendOverview } from '../friend-overview/FriendOverview';
import { ScrollableContent } from '../scrollable-content/ScrollableContent';
import styles from './WorldInstance.module.scss';

type WorldInstanceProps = {
  user: UserInfo;
};

export function WorldInstance({ user }: WorldInstanceProps): ReactElement {
  const friends = useSelector(selectFriendInfoByLocation(user));

  const mappedUser = useMemo(() => friends.map((ui) => <FriendOverview key={ui.id} friendId={ui.id} />), [friends]);

  return (
    <SubscriptionService>
      {(subscribe, unsubscribe) => (
        <ScrollableContent innerClassName={styles.WorldInstance}>
          <WorldDetail location={user.location} subscribe={subscribe} unsubscribe={unsubscribe} />
          <div className={styles.UserList}>{mappedUser}</div>
        </ScrollableContent>
      )}
    </SubscriptionService>
  );
}
