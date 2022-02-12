import { KeyboardArrowRight } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { AuthenticatedUserInfo, UserInfo } from '../../../api/types';
import { useSettings } from '../../../common/use-settings';
import { UserEvent } from '../../../store/user-events/state';
import { setModal } from '../../../store/view/actions';
import { useAppDispatch } from '../../../thunk/dispatch';
import { PropsWithSubscription } from '../../subscription-service/SubscriptionService';
import { UserEventDetail } from './UserEventDetail';
import styles from './UserEventList.module.scss';

const mappedKeys: Record<keyof AuthenticatedUserInfo, string> = {
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
  last_activity: 'Last Activity',
  last_login: 'Last Login',
  instanceId: 'Instance',
  friendKey: 'Friend State',
  developerType: 'Developer Status',
  bioLinks: 'Bio Links',
  bio: 'Bio',
  allowAvatarCopying: 'AvatarCloning',
  currentAvatarAssetUrl: 'Avatar Asset Url',
  currentAvatar: 'Avatar id',
  friendGroupNames: 'Friend group names',
  acceptedTOSVersion: 'Accepted TOS Version',
  accountDeletionDate: 'Account deletion date',
  activeFriends: 'Active friends',
  email: 'Email',
  emailVerified: 'Is Email verified',
  feature: 'Feature',
  friends: 'Friends',
  hasBirthday: 'Has Birthday',
  hasEmail: 'Has Email',
  hasLoggedInFromClient: 'Has Logged in from client',
  hasPendingEmail: 'Has pending email',
  homeLocation: 'Home location',
  obfuscatedEmail: 'Obfuscated E-Mail',
  obfuscatedPendingEmail: 'Obfuscated pending E-Mail',
  unsubscribe: 'Unsubscribed',
  oculusId: 'Oculus ID',
  offlineFriends: 'Offline Friends',
  onlineFriends: 'Online Friends',
  pastDisplayNames: 'Past display names',
  steamDetails: 'Steam details',
  steamId: 'Steam ID',
  twoFactorAuthEnabled: 'Two Factor Auth enabled',
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
  const dispatch = useAppDispatch();
  const { settings } = useSettings();

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

  const routeToProfile = useCallback(
    () => dispatch(setModal({ type: 'friend-profile', userId: userEvent.userId })),
    [dispatch, userEvent.userId],
  );

  return (
    <div className={classes} onClick={() => setCollapsed(!collapsed)}>
      <div className={styles.InfoBox}>
        <div className={styles.Timestamp}>{timestamp}</div>
        <div className={styles.DisplayName} onClick={routeToProfile}>
          {userEvent.displayName}
        </div>
        <div className={styles.Key}>{userEvent.eventType}</div>
      </div>
      <div className={styles.Comparison}>{comparisons}</div>
    </div>
  );
}
