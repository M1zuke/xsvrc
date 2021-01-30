import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { WorldDetail } from '../../container/views/user-event-list/WorldDetail';
import { selectFriendInfoByLocation } from '../../store/friends/selectors';
import { FriendOverview } from '../friend-overview/FriendOverview';
import { ScrollableContent } from '../scrollable-content/ScrollableContent';
import styles from './WorldInstance.module.scss';

type WorldInstanceProps = {
  location: string;
};

export function WorldInstance({ location }: WorldInstanceProps): ReactElement {
  const friends = useSelector(selectFriendInfoByLocation(location));

  const mappedUser = useMemo(() => friends.map((ui) => <FriendOverview key={ui.id} friendId={ui.id} />), [friends]);

  return (
    <ScrollableContent innerClassName={styles.WorldInstance}>
      <WorldDetail location={location} />
      <div className={styles.UserList}>{mappedUser}</div>
    </ScrollableContent>
  );
}
