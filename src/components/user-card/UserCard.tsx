import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { UserInfo } from '../../api/types';
import { useTrustRank } from '../../common/trust-system';
import { useMessages } from '../../i18n';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: UserInfo;
};

export function UserCard({ user }: UserCardProps): ReactElement {
  const { UserCard } = useMessages().Views;

  const avatarThumbnailImage = useMemo(() => {
    const url = user.profilePicOverride || user.currentAvatarThumbnailImageUrl;
    return {
      backgroundImage: `url('${url}')`,
    };
  }, [user.currentAvatarThumbnailImageUrl, user.profilePicOverride]);

  const userTrustRank = useTrustRank(user.tags);

  const generateClassnames = useCallback(
    (defaultStyle: string) => {
      return classNames(defaultStyle, {
        [styles.Visitor]: userTrustRank === 'Visitor',
        [styles.NewUser]: userTrustRank === 'New User',
        [styles.User]: userTrustRank === 'User',
        [styles.KnownUser]: userTrustRank === 'Known User',
        [styles.TrustedUser]: userTrustRank === 'Trusted User' || userTrustRank === 'Veteran User',
        [styles.LegendaryUser]: userTrustRank === 'Legendary User',
      });
    },
    [userTrustRank],
  );

  return (
    <Content className={styles.UserCard} translucent>
      <div className={styles.BackgroundImage} style={avatarThumbnailImage} />
      <div className={generateClassnames(styles.AvatarThumbnail)} style={avatarThumbnailImage} />
      <div className={styles.Overview}>
        <div className={styles.UserInfo}>
          <div className={styles.UserName}>
            {user.displayName} ({user.username})
          </div>
          <div className={styles.StatusDescription}>{user.statusDescription}</div>
          <div className={styles.TrustRank}>
            <div className={generateClassnames(styles.FontStyles)}>{userTrustRank}</div>
          </div>
        </div>
        <div className={styles.UserInteractions}>
          <Button onClick={() => undefined}>
            {user.isFriend ? UserCard.UserInteractions.Unfriend : UserCard.UserInteractions.Befriend}
          </Button>
        </div>
      </div>
    </Content>
  );
}
