import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { Loading } from '../../../components/loading/Loading';
import { vrcUserInfo } from '../../../store/user/selectors';
import styles from './Home.module.scss';
import { Refresh } from '@material-ui/icons';

export function Home(): ReactElement {
  const userInfo = useSelector(vrcUserInfo);

  if (userInfo === 'loading') {
    return <Loading />;
  }

  if (!isLoaded(userInfo)) {
    return <div>No Content</div>;
  }

  return (
    <div className={styles.Component}>
      <div className={styles.FriendsOverview}>
        <div className={styles.ReFetchInfo}>
          <Refresh />
        </div>
      </div>
    </div>
  );
}
