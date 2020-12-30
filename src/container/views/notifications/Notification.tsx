import { Check, Delete } from '@material-ui/icons';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { NotificationContent } from '../../../api/types';
import { Button } from '../../../components/button/Button';
import { useMessages } from '../../../i18n';
import styles from './Notifications.module.scss';

export function Notification(props: NotificationContent): ReactElement {
  const messages = useMessages();
  const formattedTime = useMemo(
    () =>
      Intl.DateTimeFormat('en-EN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date(props.created_at)),
    [props.created_at],
  );

  const showDetail = useMemo(() => {
    if (props.type === 'invite') {
      return props.details.worldName;
    }
  }, [props]);

  const message = useMemo(() => {
    switch (props.type) {
      case 'invite': {
        return messages.Views.Notifications.Message.Invite;
      }
      case 'requestInvite': {
        return messages.Views.Notifications.Message.RequestInvite;
      }
      case 'friendRequest': {
        return messages.Views.Notifications.Message.FriendRequest;
      }
    }
  }, [
    messages.Views.Notifications.Message.FriendRequest,
    messages.Views.Notifications.Message.Invite,
    messages.Views.Notifications.Message.RequestInvite,
    props.type,
  ]);
  const noOp = useCallback(() => undefined, []);

  return (
    <div className={styles.Notification}>
      <div className={styles.Info}>
        <div className={styles.CreationDate}>{formattedTime}</div>
        <div className={styles.Username}>{props.senderUsername}</div>
        <div className={styles.Message}>{message}</div>
        {showDetail && <div className={styles.Detail}>{showDetail}</div>}
      </div>
      <div className={styles.Actions}>
        <Button
          onClick={noOp}
          aria-label="delete notification"
          disabled={props.type !== 'friendRequest'}
          icon
          light
          className={styles.Accept}
        >
          <Check />
        </Button>
        <Button onClick={noOp} aria-label="delete notification" icon light className={styles.Delete}>
          <Delete />
        </Button>
      </div>
    </div>
  );
}
