import { Lock } from '@material-ui/icons';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { routes } from '../../common/routes';
import { FriendInfo } from '../../store/friends/state';
import styles from './FriendOverview.module.scss';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

type FriendOverviewProps = {
  friendInfo: FriendInfo;
};

export function FriendOverview({ friendInfo }: FriendOverviewProps): ReactElement {
  const history = useHistory();
  const avatarThumbnailImage = useMemo(
    () => ({
      backgroundImage: `url('${friendInfo.currentAvatarThumbnailImageUrl}')`,
    }),
    [friendInfo.currentAvatarThumbnailImageUrl],
  );

  const friendStatusClasses = classNames(styles.Status, {
    [styles.Active]: friendInfo.status === 'active',
    [styles.AskMe]: friendInfo.status === 'ask me',
    [styles.JoinMe]: friendInfo.status === 'join me',
    [styles.Busy]: friendInfo.status === 'busy',
  });

  const routeToProfile = useCallback(() => history.push(`${routes.friendsProfile.path}${friendInfo.id}`), [
    friendInfo.id,
    history,
  ]);

  return (
    <div className={styles.Component} onClick={routeToProfile}>
      <div className={styles.AvatarThumbnail} style={avatarThumbnailImage}>
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
