import React, { ReactElement, useMemo } from 'react';
import { UserInfo } from '../../api/types';
import { Content } from '../content/Content';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: UserInfo;
};

export function UserCard({ user }: UserCardProps): ReactElement {
  const avatarThumbnailImage = useMemo(() => {
    const url = user.profilePicOverride || user.currentAvatarThumbnailImageUrl;
    return {
      backgroundImage: `url('${url}')`,
    };
  }, [user.currentAvatarThumbnailImageUrl, user.profilePicOverride]);
  return (
    <Content className={styles.UserCard} translucent>
      <div className={styles.BackgroundImage} style={avatarThumbnailImage} />
      <div className={styles.AvatarThumbnail} style={avatarThumbnailImage} />
      <div className={styles.UserInfo}>
        <div className={styles.UserName}>
          {user.displayName} ({user.username})
        </div>
      </div>
    </Content>
  );
}
