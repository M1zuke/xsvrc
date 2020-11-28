import { Lock } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../common/routes';
import { getTrustRank } from '../../common/trust-system';
import { FriendInfo, UserInfo } from '../../store/friends/state';
import { EnrichedAuthenticatedUserInfo } from '../../store/user/state';
import styles from './FriendOverview.module.scss';

type FriendOverviewProps = {
  friendInfo: FriendInfo | EnrichedAuthenticatedUserInfo | UserInfo;
};

export function FriendOverview({ friendInfo }: FriendOverviewProps): ReactElement {
  const history = useHistory();
  const avatarThumbnailImage = useMemo(
    () => ({
      backgroundImage: `url('${friendInfo.currentAvatarThumbnailImageUrl}')`,
    }),
    [friendInfo.currentAvatarThumbnailImageUrl],
  );
  const trustRank = useMemo(() => getTrustRank(friendInfo.tags), [friendInfo.tags]);

  const trustRankClasses = useMemo(
    () =>
      classNames(styles.AvatarThumbnail, {
        [styles.Visitor]: trustRank === 'Visitor',
        [styles.NewUser]: trustRank === 'New User',
        [styles.User]: trustRank === 'User',
        [styles.KnownUser]: trustRank === 'Known User',
        [styles.TrustedUser]: trustRank === 'Trusted User' || trustRank === 'Veteran User',
        [styles.LegendaryUser]: trustRank === 'Legendary User',
      }),
    [trustRank],
  );

  const friendStatusClasses = useMemo(
    () =>
      classNames(styles.Status, {
        [styles.Active]: friendInfo.status === 'active',
        [styles.AskMe]: friendInfo.status === 'ask me',
        [styles.JoinMe]: friendInfo.status === 'join me',
        [styles.Busy]: friendInfo.status === 'busy',
      }),
    [friendInfo.status],
  );

  const routeToProfile = useCallback(() => history.push(`${routes.friendsProfile.path}${friendInfo.id}`), [
    friendInfo.id,
    history,
  ]);

  const iconStyle = useMemo(
    () => ({
      backgroundImage: `url(${friendInfo.userIcon})`,
    }),
    [friendInfo.userIcon],
  );

  return (
    <div className={styles.Component} onClick={routeToProfile}>
      <div className={trustRankClasses} style={avatarThumbnailImage}>
        {friendInfo.userIcon && <div className={styles.Icon} style={iconStyle} />}
        {friendInfo.location === 'private' && (
          <div className={styles.PrivateIcon}>
            <Lock fontSize="small" />
          </div>
        )}
        <div className={friendStatusClasses} />
        <div className={styles.DisplayName}>{friendInfo.displayName}</div>
      </div>
    </div>
  );
}
