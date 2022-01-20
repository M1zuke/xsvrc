import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAdvancedFilter } from '../../../components/advanced-filter/AdvancedFilter';
import { Pagination } from '../../../components/pagination/Pagination';
import { useMessages } from '../../../i18n';
import { selectUserEvents } from '../../../store/user-events/selectors';
import {
  SubscribeFunction,
  SubscriptionService,
  UnsubscribeFunction,
} from '../../subscription-service/SubscriptionService';
import { TitleBox } from '../home/TitleBox';
import { useUserEventListAdvancedList } from './user-event-list-advanced-list';
import { UserEventItem } from './UserEventItem';
import styles from './UserEventList.module.scss';

export function UserEventList(): ReactElement {
  const messages = useMessages();
  const userEvents = useSelector(selectUserEvents);
  const advancedFilterConfig = useUserEventListAdvancedList();
  const [config, advancedFilter] = useAdvancedFilter(advancedFilterConfig);

  const listItems = useCallback(
    (subscribe: SubscribeFunction, unsubscribe: UnsubscribeFunction) => {
      const filteredItems = userEvents.filter((ue) => {
        let doesMatch = true;
        config.forEach((c) => {
          if (doesMatch) {
            if (c.filter.length === 0) {
              doesMatch = true;
            } else if (!c.filter.includes(ue[c.key].toString())) {
              doesMatch = false;
            }
          }
        });
        return doesMatch;
      });

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
    [config, userEvents],
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
          <TitleBox title={messages.Views.UserEventList.Title}>
            <div className={styles.TagSearch}>{advancedFilter}</div>
          </TitleBox>
          <Pagination data={listItems(subscribe, unsubscribe)} pageSize={25}>
            {(records) => (
              <div className={styles.ScrollableContent} style={style(records.length)}>
                {records}
              </div>
            )}
          </Pagination>
        </div>
      )}
    </SubscriptionService>
  );
}
