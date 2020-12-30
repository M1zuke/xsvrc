import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { NotificationContent } from '../../../api/types';
import { Button } from '../../../components/button/Button';
import { Content } from '../../../components/content/Content';
import { Pagination } from '../../../components/pagination/Pagination';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { selectNotifications } from '../../../store/user/selectors';
import { Notification } from './Notification';
import styles from './Notifications.module.scss';

type FilterType = NotificationContent['type'] | 'all';

export function Notifications(): ReactElement {
  const notifications = useSelector(selectNotifications);
  const messages = useMessages();
  const [filter, setFilter] = useState<FilterType>('all');

  const isActive = useCallback((cf: FilterType) => filter === cf, [filter]);

  const filteredNotifications = useMemo(() => {
    if (isLoaded(notifications)) {
      if (filter !== 'all') {
        return notifications.filter((not) => not.type === filter);
      }
      return notifications;
    }
    return [];
  }, [filter, notifications]);

  return (
    <div className={styles.Component}>
      <Content className={styles.Filter}>
        <Button onClick={() => setFilter('all')} aria-label="filter invites" active={isActive('all')}>
          {messages.Views.Notifications.Filter.All}
        </Button>
        <Button onClick={() => setFilter('invite')} aria-label="filter invites" active={isActive('invite')}>
          {messages.Views.Notifications.Filter.Invites}
        </Button>
        <Button
          onClick={() => setFilter('friendRequest')}
          aria-label="filter invites"
          active={isActive('friendRequest')}
        >
          {messages.Views.Notifications.Filter.FriendRequests}
        </Button>
        <Button
          onClick={() => setFilter('requestInvite')}
          aria-label="filter invites"
          active={isActive('requestInvite')}
        >
          {messages.Views.Notifications.Filter.RequestInvites}
        </Button>
      </Content>
      <div className={styles.Content}>
        <Pagination data={filteredNotifications} pageSize={50}>
          {(data) => (
            <ScrollableContent innerClassName={styles.Notifications}>
              {data.map((not) => (
                <Notification key={not.id} {...not} />
              ))}
            </ScrollableContent>
          )}
        </Pagination>
      </div>
    </div>
  );
}
