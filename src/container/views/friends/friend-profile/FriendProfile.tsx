import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isLoaded } from '../../../../api/prepare';
import { useApi } from '../../../../api/use-api';
import { Content } from '../../../../components/content/Content';
import { LoadableContent } from '../../../../components/loadable-content/LoadableContent';
import { RenderJSON } from '../../../../components/render-json/RenderJSON';
import { ScrollableContent } from '../../../../components/scrollable-content/ScrollableContent';
import { Tabs } from '../../../../components/tabs/Tabs';
import { UserCard } from '../../../../components/user-card/UserCard';
import { WorldInstance } from '../../../../components/world-instance/WorldInstance';
import { useMessages } from '../../../../i18n';
import { selectFriendInfoById, selectFriendInfoByLocation } from '../../../../store/friends/selectors';
import styles from './FriendsProfile.module.scss';
import { UserBio } from './UserBio';

type FriendProfileParams = {
  id: string;
};

export function FriendProfile(): ReactElement {
  const { FriendsProfile } = useMessages().Views;
  const { id } = useParams<FriendProfileParams>();
  const cachedUser = useSelector(selectFriendInfoById(id));
  const samePeopleInInstance = useSelector(selectFriendInfoByLocation(cachedUser));
  const { getUser } = useApi();

  useEffect(() => {
    if (!isLoaded(cachedUser)) {
      getUser(id).finally();
    }
  }, [cachedUser, getUser, id]);

  return (
    <div className={styles.Component}>
      <LoadableContent data={cachedUser} columns={3} rows={3}>
        {(user) => (
          <>
            <UserCard user={user} />
            <Content>
              <Tabs
                title={[
                  FriendsProfile.Tabs.Bio,
                  FriendsProfile.Tabs.Instance(samePeopleInInstance.length),
                  FriendsProfile.Tabs.JSON,
                ]}
              >
                <ScrollableContent innerClassName={styles.ScrollableContent}>
                  <UserBio user={user} />
                </ScrollableContent>
                <WorldInstance user={user} />
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
