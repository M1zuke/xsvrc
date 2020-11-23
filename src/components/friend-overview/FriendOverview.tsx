import React, { ReactElement, useMemo } from 'react';
import { FriendInfo } from '../../store/friends/state';
import styles from './FriendOverview.module.scss';
import classNames from 'classnames';

type FriendOverviewProps = {
  friendInfo: FriendInfo;
};

export function FriendOverview({ friendInfo }: FriendOverviewProps): ReactElement {
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
    [styles.Private]: friendInfo.location === 'private',
  });

  return (
    <div className={styles.Component}>
      <div className={styles.AvatarThumbnail} style={avatarThumbnailImage}>
        <div className={friendStatusClasses} />
        <div className={styles.DisplayName}>{friendInfo.displayName}</div>
      </div>
    </div>
  );
}
