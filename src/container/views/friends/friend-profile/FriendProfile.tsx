import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Content } from '../../../../components/content/Content';
import { LoadableContent } from '../../../../components/loadable-content/LoadableContent';
import { RenderJSON } from '../../../../components/render-json/RenderJSON';
import { ScrollableContent } from '../../../../components/scrollable-content/ScrollableContent';
import { Tabs } from '../../../../components/tabs/Tabs';
import { UserCard } from '../../../../components/user-card/UserCard';
import { WorldInstance } from '../../../../components/world-instance/WorldInstance';
import { useMessages } from '../../../../i18n';
import { selectFriendInfoById } from '../../../../store/friends/selectors';
import styles from './FriendsProfile.module.scss';

type FriendProfileParams = {
  id: string;
};

export function FriendProfile(): ReactElement {
  const { FriendsProfile } = useMessages().Views;
  const { id } = useParams<FriendProfileParams>();
  const cachedUser = useSelector(selectFriendInfoById(id));

  return (
    <div className={styles.Component}>
      <LoadableContent data={cachedUser} columns={3} rows={3}>
        {(user) => (
          <>
            <UserCard user={user} />
            <Content>
              <Tabs title={[FriendsProfile.Tabs.Overview, FriendsProfile.Tabs.JSON]}>
                <WorldInstance location={user.location} />
                <ScrollableContent innerClassName={styles.Content}>
                  <RenderJSON json={user} />
                </ScrollableContent>
              </Tabs>
            </Content>
          </>
        )}
      </LoadableContent>
    </div>
  );
}
