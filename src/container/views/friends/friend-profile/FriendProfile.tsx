import { Home } from '@material-ui/icons';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isLoaded } from '../../../../api/prepare';
import { useApi } from '../../../../api/use-api';
import { Button } from '../../../../components/button/Button';
import { Content } from '../../../../components/content/Content';
import { FriendOverview } from '../../../../components/friend-overview/FriendOverview';
import { messages } from '../../../../i18n/en';
import { selectCachedUser } from '../../../../store/friends/selectors';
import styles from './FriendsProfile.module.scss';

type FriendProfileParams = {
  id: string;
};
export function FriendProfile(): ReactElement {
  const { id } = useParams<FriendProfileParams>();
  const cachedUser = useSelector(selectCachedUser(id));
  const { getUser } = useApi();
  const noOp = useCallback(() => undefined, []);

  useEffect(() => {
    getUser(id).finally();
  }, [getUser, id]);

  if (!isLoaded(cachedUser)) {
    return <div className={styles.NotFound}>{messages.Views.FriendsProfile.NotFound}</div>;
  }

  return (
    <div className={styles.Component}>
      <Content className={styles.AvatarImage}>
        <FriendOverview friendInfo={cachedUser} />
      </Content>

      <Content className={styles.ShortInfo}>
        <div>{cachedUser.id}</div>
      </Content>
      <Content>
        <Button aria-label="test" onClick={noOp}>
          <Home />
        </Button>
      </Content>
      <Content className={styles.FullView} />
    </div>
  );
}
