import React, { ReactElement } from 'react';
import { UserInfo } from '../../../../api/types';
import styles from './UserOverview.module.scss';

type UserBioProps = {
  user: UserInfo;
};

export function UserOverview({ user }: UserBioProps): ReactElement {
  return (
    <div className={styles.Component}>
      <div className={styles.UserBio}>
        <pre>{user.bio}</pre>
      </div>
    </div>
  );
}
