import { KeyboardArrowRight } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useMemo, useState } from 'react';
import { UserInfo } from '../../../api/types';
import { UserEvent } from '../../../store/user-events/state';
import { UserEventDetail } from './UserEventDetail';
import styles from './UserEventList.module.scss';

const mappedKeys: Record<keyof UserInfo, string> = {
  displayName: 'Username',
  location: 'Location',
  currentAvatarThumbnailImageUrl: 'Avatar',
  currentAvatarImageUrl: 'Avatar',
  state: 'State',
  status: 'Status',
  isFriend: 'Friend Status',
  id: 'ID',
  worldId: 'WorldId',
  username: 'Username',
  userIcon: 'UserIcon',
  tags: 'Tags',
  statusDescription: 'Description',
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

export function UserEventItem({ userEvent }: UserEventItemProps): ReactElement {
  const [collapsed, setCollapsed] = useState(true);

  const timestamp = useMemo(
    () =>
      Intl.DateTimeFormat('en-En', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(userEvent.timestamp),
    [userEvent.timestamp],
  );

  const classes = useMemo(() => classNames(styles.UserEvent, { [styles.Collapsed]: collapsed }), [collapsed]);

  return (
    <div className={classes} onClick={() => setCollapsed(!collapsed)}>
      <div className={styles.InfoBox}>
        <div className={styles.Timestamp}>{timestamp}</div>
        <div className={styles.DisplayName}>{userEvent.displayName}</div>
        <div className={styles.Key}>{mappedKeys[userEvent.key]}</div>
      </div>
      <div className={styles.ChangeInfo}>
        <UserEventDetail eventKey={userEvent.key} value={userEvent.previous} />
        <KeyboardArrowRight />
        <UserEventDetail eventKey={userEvent.key} value={userEvent.current} />
      </div>
    </div>
  );
}
