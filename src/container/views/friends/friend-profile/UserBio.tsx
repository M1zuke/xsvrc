import React, { ReactElement } from 'react';
import { UserInfo } from '../../../../api/types';
import styles from './FriendsProfile.module.scss';

type UserBioProps = {
  user: UserInfo;
};

export function UserBio({ user }: UserBioProps): ReactElement {
  return (
    <div className={styles.UserBio}>
      <pre>{user.bio}</pre>
    </div>
  );
}
