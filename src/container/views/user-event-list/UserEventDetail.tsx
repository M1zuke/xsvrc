import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../../api/types';
import { useMessages } from '../../../i18n';
import { selectSettings } from '../../../store/persisted/selectors';
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
  const settings = useSelector(selectSettings);
  const messages = useMessages();
  const Format = messages.Format.FullDate(settings);
  if (eventKey === 'currentAvatarThumbnailImageUrl' && typeof value === 'string') {
    const backgroundImage = {
      backgroundImage: `url('${value}')`,
    };
    return <div className={`${styles.UserEventDetail} ${styles.Thumbnail}`} style={backgroundImage} />;
  }

  if (
    typeof value === 'string' &&
    eventKey === 'location' &&
    value !== 'offline' &&
    value !== '' &&
    value !== 'private'
  ) {
    return <WorldDetail location={value} subscribe={subscribe} unsubscribe={unsubscribe} />;
  }

  if (typeof value === 'string' && (eventKey === 'last_activity' || eventKey === 'last_login')) {
    return <div className={classNames(styles.UserEventDetail)}>{Format(value) || '-'}</div>;
  }

  return (
    <div className={classNames(styles.UserEventDetail, { [styles.Primary]: primary })}>{value?.toString() || '-'}</div>
  );
}
