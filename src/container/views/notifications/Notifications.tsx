import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { NotificationContent } from '../../../api/types';
import { Button } from '../../../components/button/Button';
import { Pagination } from '../../../components/pagination/Pagination';
import { useMessages } from '../../../i18n';
import { selectNotifications } from '../../../store/user/selectors';
import { TitleBox } from '../home/TitleBox';
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

  const renderedNotifications = useMemo(() => {
    return filteredNotifications.map((not) => <Notification key={not.id} {...not} />);
  }, [filteredNotifications]);

  const style = useCallback(
    (items: number) => ({
      gridTemplateRows: `repeat(${items}, minmax(min-content, max-content))`,
    }),
    [],
  );

  return (
    <div className={styles.Component}>
      <TitleBox className={styles.Filter} title="Notifications">
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
      </TitleBox>
      <div className={styles.Content}>
        <Pagination data={renderedNotifications} pageSize={50}>
          {(data) => (
            <div className={styles.Notifications} style={style(data.length)}>
              {data}
            </div>
          )}
        </Pagination>
      </div>
    </div>
  );
}
