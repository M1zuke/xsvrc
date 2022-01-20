import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { UserOverview } from './UserOverview';

type FriendProfileParams = {
  id: string;
};

export function FriendProfile(): ReactElement {
  const { FriendsProfile } = useMessages().Views;
  const { id } = useParams<FriendProfileParams>();
  const cachedUser = useSelector(selectFriendInfoById(id));
  const samePeopleInInstance = useSelector(selectFriendInfoByLocation(cachedUser));
  const { getUser } = useApi();

  const tabTitles = useMemo(() => {
    if (samePeopleInInstance.length === 0) {
      return [FriendsProfile.Tabs.Overview, FriendsProfile.Tabs.JSON];
    }
    return [
      FriendsProfile.Tabs.Overview,
      FriendsProfile.Tabs.Instance(samePeopleInInstance.length),
      FriendsProfile.Tabs.JSON,
    ];
  }, [FriendsProfile.Tabs, samePeopleInInstance.length]);

  useEffect(() => {
    getUser(id).finally();
  }, [getUser, id]);

  return (
    <div className={styles.Component}>
      <LoadableContent data={cachedUser} columns={3} rows={3}>
        {(user) => (
          <>
            <UserCard user={user} />
            <Content>
              <Tabs title={tabTitles}>
                <ScrollableContent innerClassName={styles.ScrollableContent}>
                  <UserOverview user={user} />
                </ScrollableContent>
                {samePeopleInInstance.length !== 0 && <WorldInstance user={user} />}
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
