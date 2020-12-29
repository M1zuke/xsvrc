import React, { ReactElement } from 'react';
import { NotificationDTO } from '../../../api/types';
import styles from './Notifications.module.scss';

export function Notification({ senderUsername, type, seen, created_at }: NotificationDTO): ReactElement {
  return (
    <div className={styles.Notification}>
      <div className={styles.Info}>
        <div className={styles.Username}>{senderUsername}</div>
        <div className={styles.Type}>{type}</div>
        <div className={styles.Seen}>{seen.toString()}</div>
      </div>
      <div className={styles.CreationDate}>{created_at}</div>
    </div>
  );
}
