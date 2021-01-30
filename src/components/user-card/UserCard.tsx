import React, { ReactElement, useMemo } from 'react';
import { UserInfo } from '../../api/types';
import { Content } from '../content/Content';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: UserInfo;
};

export function UserCard({ user }: UserCardProps): ReactElement {
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url('${user.currentAvatarThumbnailImageUrl}')`,
    }),
    [user.currentAvatarThumbnailImageUrl],
  );
  return (
    <Content className={styles.UserCard} translucent>
      <div className={styles.BackgroundImage} style={backgroundStyle} />
      <div className={styles.AvatarThumbnail} style={backgroundStyle} />
      <div className={styles.UserInfo}>
        <div className={styles.UserName}>
          {user.displayName} ({user.username})
        </div>
      </div>
    </Content>
  );
}
