import { KeyboardArrowRight } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useMemo, useState } from 'react';
import { UserInfo } from '../../../api/types';
import { useSettings } from '../../../common/use-settings';
import { UserEvent } from '../../../store/user-events/state';
import { PropsWithSubscription } from '../../subscription-service/SubscriptionService';
import { UserEventDetail } from './UserEventDetail';
import styles from './UserEventList.module.scss';

const mappedKeys: Record<keyof UserInfo, string> = {
  displayName: 'Username',
  location: 'Location',
  currentAvatarThumbnailImageUrl: 'Avatar Thumbnail',
  currentAvatarImageUrl: 'Avatar',
  fallbackAvatar: 'Fallback Avatar',
  profilePicOverride: 'Profile Picture',
  state: 'State',
  status: 'Status',
  isFriend: 'Friend Status',
  id: 'ID',
  worldId: 'WorldId',
  username: 'Username',
  userIcon: 'UserIcon',
  tags: 'Tags',
  statusDescription: 'Status Description',
  last_platform: 'Last Platform',
  last_login: 'Last Login',
  instanceId: 'Instance',
  friendKey: 'Friend State',
  developerType: 'Developer Status',
  bioLinks: 'Bio Links',
  bio: 'Bio',
  allowAvatarCopying: 'AvatarCloning',
};

type UserEventItemProps = {
  userEvent: UserEvent;
};

export function UserEventItem({
  userEvent,
  subscribe,
  unsubscribe,
}: PropsWithSubscription<UserEventItemProps>): ReactElement {
  const [collapsed, setCollapsed] = useState(true);
  const settings = useSettings();

  const timestamp = useMemo(
    () =>
      Intl.DateTimeFormat(settings.localization, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: settings.use12hours,
      }).format(userEvent.timestamp),
    [settings.localization, settings.use12hours, userEvent.timestamp],
  );

  const classes = classNames(styles.UserEvent, { [styles.Collapsed]: collapsed });

  const comparisons = useMemo(() => {
    return Object.keys(userEvent.comparison).map((k) => {
      const key = k as keyof UserInfo;
      return (
        <React.Fragment key={`${key}-${userEvent.eventKey}`}>
          <UserEventDetail
            eventKey="displayName"
            value={mappedKeys[key]}
            primary
            subscribe={subscribe}
            unsubscribe={unsubscribe}
          />
          <UserEventDetail
            eventKey={key}
            value={userEvent.comparison[key]?.from}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
          />
          <KeyboardArrowRight />
          <UserEventDetail
            eventKey={key}
            value={userEvent.comparison[key]?.to}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
          />
        </React.Fragment>
      );
    });
  }, [subscribe, unsubscribe, userEvent.comparison, userEvent.eventKey]);

  return (
    <div className={classes} onClick={() => setCollapsed(!collapsed)}>
      <div className={styles.InfoBox}>
        <div className={styles.Timestamp}>{timestamp}</div>
        <div className={styles.DisplayName}>{userEvent.displayName}</div>
        <div className={styles.Key}>{userEvent.eventType}</div>
      </div>
      <div className={styles.Comparison}>{comparisons}</div>
    </div>
  );
}
