import React, { ReactElement, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Content } from '../../../components/content/Content';
import { TextInput } from '../../../components/input/TextInput';
import { Pagination } from '../../../components/pagination/Pagination';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { selectUserEvents } from '../../../store/user-events/selectors';
import { UserEventItem } from './UserEventItem';
import styles from './UserEventList.module.scss';

export function UserEventList(): ReactElement {
  const messages = useMessages();
  const userEvents = useSelector(selectUserEvents);
  const [usernameFilter, setUsernameFiler] = useState('');

  const listItems = useMemo(() => {
    const filteredItems =
      usernameFilter !== ''
        ? userEvents.filter((i) => i.displayName.toLowerCase().includes(usernameFilter.toLowerCase()))
        : userEvents;

    if (filteredItems.length === 0) {
      return [
        <div key={`No Events Yet`} className={styles.NoEntry}>
          No Events Yet.
        </div>,
      ];
    }
    return filteredItems.map((userEvent) => {
      return (
        <UserEventItem
          key={`UserEventItem-${userEvent.eventType}-${userEvent.displayName}-${userEvent.eventKey}`}
          userEvent={userEvent}
        />
      );
    });
  }, [userEvents, usernameFilter]);

  const style = useMemo(
    () => ({
      gridTemplateRows: `repeat(${listItems.length}, minmax(min-content, max-content))`,
    }),
    [listItems.length],
  );

  return (
    <Content className={styles.Component}>
      <div className={styles.TagSearch}>
        <TextInput
          aria-label="tag-search"
          placeholder={messages.Views.UserEventList.SearchUsername}
          onChange={setUsernameFiler}
        />
      </div>
      <Pagination data={listItems} pageSize={25}>
        {(records) => (
          <ScrollableContent innerClassName={styles.ScrollableContent} style={style}>
            {records}
          </ScrollableContent>
        )}
      </Pagination>
    </Content>
  );
}
