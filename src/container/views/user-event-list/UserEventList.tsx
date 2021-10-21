import React, { ReactElement, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Content } from '../../../components/content/Content';
import { TextInput } from '../../../components/input/TextInput';
import { Pagination } from '../../../components/pagination/Pagination';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { selectUserEvents } from '../../../store/user-events/selectors';
import {
  SubscribeFunction,
  SubscriptionService,
  UnsubscribeFunction,
} from '../../subscription-service/SubscriptionService';
import { UserEventItem } from './UserEventItem';
import styles from './UserEventList.module.scss';

export function UserEventList(): ReactElement {
  const messages = useMessages();
  const userEvents = useSelector(selectUserEvents);
  const [usernameFilter, setUsernameFiler] = useState('');

  const listItems = useCallback(
    (subscribe: SubscribeFunction, unsubscribe: UnsubscribeFunction) => {
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
            subscribe={subscribe}
            unsubscribe={unsubscribe}
          />
        );
      });
    },
    [userEvents, usernameFilter],
  );

  const style = useCallback(
    (items: number) => ({
      gridTemplateRows: `repeat(${items}, minmax(min-content, max-content))`,
    }),
    [],
  );

  return (
    <SubscriptionService>
      {(subscribe, unsubscribe) => (
        <div className={styles.Component}>
          <Content className={styles.TagSearch}>
            <TextInput
              aria-label="tag-search"
              placeholder={messages.Views.UserEventList.SearchUsername}
              onChange={setUsernameFiler}
            />
          </Content>
          <Pagination data={listItems(subscribe, unsubscribe)} pageSize={25}>
            {(records) => (
              <ScrollableContent innerClassName={styles.ScrollableContent} style={style(records.length)}>
                {records}
              </ScrollableContent>
            )}
          </Pagination>
        </div>
      )}
    </SubscriptionService>
  );
}
