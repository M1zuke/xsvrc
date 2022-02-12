import { Check, Delete } from '@mui/icons-material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { NotificationsAnswerPossibility } from '../../../api/notifications-api';
import { NotificationContent } from '../../../api/types';
import { useApi } from '../../../api/use-api';
import { useSettings } from '../../../common/use-settings';
import { Button } from '../../../components/button/Button';
import { useMessages } from '../../../i18n';
import { setModal } from '../../../store/view/actions';
import { useAppDispatch } from '../../../thunk/dispatch';
import styles from './Notifications.module.scss';

export function Notification(props: NotificationContent): ReactElement {
  const messages = useMessages();
  const { settings } = useSettings();
  const { handleNotification } = useApi();
  const dispatch = useAppDispatch();
  const formattedTime = useMemo(
    () =>
      Intl.DateTimeFormat(settings.localization, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: settings.use12hours,
      }).format(new Date(props.created_at)),
    [props.created_at, settings.localization, settings.use12hours],
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
  const manageNotification = useCallback(
    (method: NotificationsAnswerPossibility) => handleNotification(props, method).finally(),
    [handleNotification, props],
  );
  const routeToProfile = useCallback(
    () => dispatch(setModal({ type: 'friend-profile', userId: props.senderUserId })),
    [dispatch, props.senderUserId],
  );

  return (
    <div className={styles.Notification}>
      <div className={styles.Info}>
        <div className={styles.CreationDate}>{formattedTime}</div>
        <div className={styles.Username} onClick={routeToProfile}>
          {props.senderUsername}
        </div>
        <div className={styles.Message}>{message}</div>
        {showDetail && <div className={styles.Detail}>{showDetail}</div>}
      </div>
      <div className={styles.Actions}>
        <Button
          onClick={() => manageNotification('accept')}
          aria-label="Accept notification"
          icon
          light
          className={styles.Accept}
        >
          <Check />
        </Button>
        <Button
          onClick={() => manageNotification('hide')}
          aria-label="delete notification"
          icon
          light
          className={styles.Delete}
        >
          <Delete />
        </Button>
      </div>
    </div>
  );
}
