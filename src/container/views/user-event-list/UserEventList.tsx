import React, { ReactElement, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from '../../../components/pagination/Pagination';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { selectUserEvents } from '../../../store/user-events/selectors';
import { UserEvent } from '../../../store/user-events/state';
import { UserEventItem } from './UserEventItem';
import styles from './UserEventList.module.scss';

export function UserEventList(): ReactElement {
  const userEvents = useSelector(selectUserEvents);
  const listItems = useCallback((items: UserEvent[]) => {
    if (items.length === 0) {
      return <div className={styles.NoEntry}>No Events Yet.</div>;
    }
    return items.map((userEvent) => {
      return (
        <UserEventItem
          key={`UserEventItem-${userEvent.key}-${userEvent.displayName}-${userEvent.eventKey}`}
          userEvent={userEvent}
        />
      );
    });
  }, []);

  const style = useMemo(
    () => ({
      gridTemplateRows: `repeat(${userEvents.length}, minmax(min-content, max-content))`,
    }),
    [userEvents.length],
  );

  return (
    <Pagination data={userEvents} pageSize={25}>
      {(records) => (
        <ScrollableContent innerClassName={styles.Component} style={style}>
          {listItems(records)}
        </ScrollableContent>
      )}
    </Pagination>
  );
}
