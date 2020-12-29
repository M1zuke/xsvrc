import { Home } from '@material-ui/icons';
import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/button/Button';
import { Content } from '../../../../components/content/Content';
import { FriendOverview } from '../../../../components/friend-overview/FriendOverview';
import { LoadableContent } from '../../../../components/loadable-content/LoadableContent';
import { RenderJSON } from '../../../../components/render-json/RenderJSON';
import { ScrollableContent } from '../../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../../i18n';
import { selectFriendInfoById } from '../../../../store/friends/selectors';
import styles from './FriendsProfile.module.scss';

type FriendProfileParams = {
  id: string;
};

export function FriendProfile(): ReactElement {
  const { ShortInfo, Actions } = useMessages().Views.FriendsProfile;
  const { id } = useParams<FriendProfileParams>();
  const cachedUser = useSelector(selectFriendInfoById(id));
  const noOp = useCallback(() => undefined, []);

  return (
    <div className={styles.Component}>
      <LoadableContent data={cachedUser} columns={3} rows={3}>
        {(user) => (
          <>
            <Content className={styles.AvatarImage}>
              <FriendOverview friendInfo={user} />
            </Content>
            <Content className={styles.ShortInfo}>
              <div className={styles.Bold}>{ShortInfo.UserId}</div>
              <div>{user.id}</div>
              <div className={styles.Bold}>{ShortInfo.LastLogin}</div>
              <div>{user.last_login}</div>
            </Content>
            <Content className={styles.Links}>
              <Button aria-label="test" onClick={noOp}>
                <Home />
              </Button>
            </Content>
            <Content className={styles.Actions}>
              <Button onClick={noOp} aria-label="friend user">
                {user.isFriend ? Actions.Unfriend : Actions.AddFriend}
              </Button>
            </Content>
            <ScrollableContent className={styles.FullView}>
              <RenderJSON json={user} />
            </ScrollableContent>
          </>
        )}
      </LoadableContent>
    </div>
  );
}
