import { Lock } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { routes } from '../../common/routes';
import { getTrustRank } from '../../common/trust-system';
import { Loadable } from '../../store/reducer';
import styles from './FriendOverview.module.scss';

const defaultUserInfo: UserInfo = {
  id: 'unknown',
  last_platform: '',
  status: 'offline',
  displayName: 'unknown',
  location: 'offline',
  currentAvatarThumbnailImageUrl: 'unknown',
  instanceId: 'offline',
  worldId: 'offline',
  allowAvatarCopying: false,
  bio: '',
  bioLinks: [],
  developerType: 'none',
  friendKey: '',
  last_login: 'N.A.',
  statusDescription: 'N.A.',
  tags: [],
  userIcon: '',
  username: 'unknown',
  isFriend: false,
  state: 'offline',
  currentAvatarImageUrl: '',
};

type FriendOverviewProps = {
  friendInfo: Loadable<UserInfo>;
  small?: boolean;
};

export function FriendOverview({ friendInfo, small }: FriendOverviewProps): ReactElement {
  const history = useHistory();

  const $friendInfo = useMemo(() => (isLoaded(friendInfo) ? friendInfo : defaultUserInfo), [friendInfo]);

  const avatarThumbnailImage = useMemo(
    () => ({
      backgroundImage: `url('${$friendInfo.currentAvatarThumbnailImageUrl}')`,
    }),
    [$friendInfo.currentAvatarThumbnailImageUrl],
  );
  const trustRank = useMemo(() => getTrustRank($friendInfo.tags), [$friendInfo.tags]);

  const trustRankClasses = useMemo(
    () =>
      classNames(styles.Component, {
        [styles.Visitor]: trustRank === 'Visitor',
        [styles.NewUser]: trustRank === 'New User',
        [styles.User]: trustRank === 'User',
        [styles.KnownUser]: trustRank === 'Known User',
        [styles.TrustedUser]: trustRank === 'Trusted User' || trustRank === 'Veteran User',
        [styles.LegendaryUser]: trustRank === 'Legendary User',
        [styles.Small]: small,
      }),
    [small, trustRank],
  );

  const friendStatusClasses = useMemo(
    () =>
      classNames(styles.Status, {
        [styles.Active]: $friendInfo.status === 'active',
        [styles.AskMe]: $friendInfo.status === 'ask me',
        [styles.JoinMe]: $friendInfo.status === 'join me',
        [styles.Busy]: $friendInfo.status === 'busy',
      }),
    [$friendInfo.status],
  );

  const routeToProfile = useCallback(() => history.push(`${routes.friendsProfile.path}/${$friendInfo.id}`), [
    $friendInfo.id,
    history,
  ]);

  const iconStyle = useMemo(
    () => ({
      backgroundImage: `url(${$friendInfo.userIcon})`,
    }),
    [$friendInfo.userIcon],
  );

  return (
    <div className={trustRankClasses} style={avatarThumbnailImage} onClick={routeToProfile}>
      {$friendInfo.userIcon && <div className={styles.Icon} style={iconStyle} />}
      {$friendInfo.location && $friendInfo.location === 'private' && (
        <div className={styles.PrivateIcon}>
          <Lock fontSize="small" />
        </div>
      )}
      <div className={friendStatusClasses} />
      <div className={styles.DisplayName}>{$friendInfo.displayName}</div>
    </div>
  );
}
