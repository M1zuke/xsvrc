import React, { ReactElement } from 'react';
import { UserInfo } from '../../../api/types';
import styles from './UserEventList.module.scss';
import { WorldDetail } from './WorldDetail';

type UserEventDetailProps<K extends keyof UserInfo = keyof UserInfo> = {
  eventKey: K;
  value: UserInfo[K];
};

export function UserEventDetail({ eventKey, value }: UserEventDetailProps): ReactElement {
  if (eventKey === 'currentAvatarThumbnailImageUrl' && typeof value === 'string') {
    const backgroundImage = {
      backgroundImage: `url('${value}')`,
    };
    return <div className={`${styles.UserEventDetail} ${styles.Thumbnail}`} style={backgroundImage} />;
  }

  if (eventKey === 'location') {
    console.log(value);
    return <WorldDetail location={value as string} />;
  }

  return <div className={styles.UserEventDetail}>{value}</div>;
}
