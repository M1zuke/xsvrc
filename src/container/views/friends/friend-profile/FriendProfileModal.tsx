import { Close } from '@mui/icons-material';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../../../../api/use-api';
import { Button } from '../../../../components/button/Button';
import { Content } from '../../../../components/content/Content';
import { LoadableContent } from '../../../../components/loadable-content/LoadableContent';
import { Modal } from '../../../../components/modal/Modal';
import { RenderJSON } from '../../../../components/render-json/RenderJSON';
import { ScrollableContent } from '../../../../components/scrollable-content/ScrollableContent';
import { Tabs } from '../../../../components/tabs/Tabs';
import { UserCard } from '../../../../components/user-card/UserCard';
import { WorldInstance } from '../../../../components/world-instance/WorldInstance';
import { useMessages } from '../../../../i18n';
import { selectFriendInfoById, selectFriendInfoByLocation } from '../../../../store/friends/selectors';
import { Dialog, DialogWithProps } from '../../../dialog/Dialog';
import styles from './FriendsProfileModal.module.scss';
import { UserOverview } from './UserOverview';

type FriendProfileProps = {
  userId: string;
};

export function FriendProfileModal({ userId, onCanceled }: DialogWithProps<FriendProfileProps>): ReactElement {
  const { FriendsProfile } = useMessages().Views;
  const cachedUser = useSelector(selectFriendInfoById(userId));
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
    getUser(userId).finally();
  }, [getUser, userId]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <Button onClick={onCanceled} className={styles.CloseButton} icon>
          <Close />
        </Button>
        <LoadableContent data={cachedUser} columns={3} rows={3}>
          {(user) => (
            <>
              <UserCard user={user} />
              <Content translucent>
                <Tabs title={tabTitles}>
                  <ScrollableContent innerClassName={styles.ScrollableContent} translucent>
                    <UserOverview user={user} />
                  </ScrollableContent>
                  {samePeopleInInstance.length !== 0 && <WorldInstance user={user} />}
                  <ScrollableContent innerClassName={styles.Content} translucent>
                    <RenderJSON json={user} />
                  </ScrollableContent>
                </Tabs>
              </Content>
            </>
          )}
        </LoadableContent>
      </Dialog>
    </Modal>
  );
}
