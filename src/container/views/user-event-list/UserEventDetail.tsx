import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { UserInfo } from '../../../api/types';
import { PropsWithSubscription } from '../../subscription-service/SubscriptionService';
import styles from './UserEventList.module.scss';
import { WorldDetail } from './WorldDetail';

type UserEventDetailProps<K extends keyof UserInfo = keyof UserInfo> = {
  eventKey: K;
  value?: UserInfo[K];
  primary?: boolean;
};

export function UserEventDetail({
  eventKey,
  value,
  primary,
  subscribe,
  unsubscribe,
}: PropsWithSubscription<UserEventDetailProps>): ReactElement {
  if (eventKey === 'currentAvatarThumbnailImageUrl' && typeof value === 'string') {
    const backgroundImage = {
      backgroundImage: `url('${value}')`,
    };
    return <div className={`${styles.UserEventDetail} ${styles.Thumbnail}`} style={backgroundImage} />;
  }

  if (eventKey === 'location') {
    return <WorldDetail location={value as string} subscribe={subscribe} unsubscribe={unsubscribe} />;
  }

  return <div className={classNames(styles.UserEventDetail, { [styles.Primary]: primary })}>{value?.toString()}</div>;
}
