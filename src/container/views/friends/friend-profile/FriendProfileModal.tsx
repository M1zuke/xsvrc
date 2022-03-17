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
import { Tabs, TabsConfig } from '../../../../components/tabs/Tabs';
import { UserCard } from '../../../../components/user-card/UserCard';
import { WorldInstance } from '../../../../components/world-instance/WorldInstance';
import { useMessages } from '../../../../i18n';
import { selectFriendInfoById, selectFriendInfoByLocation } from '../../../../store/friends/selectors';
import { Dialog, DialogWithProps } from '../../../dialog/Dialog';
import styles from './FriendsProfileModal.module.scss';
import { HistoryTab } from './history/HistoryTab';
import { UserOverview } from './UserOverview';

type FriendProfileProps = {
  userId: string;
};

export function FriendProfileModal({ userId, onCanceled }: DialogWithProps<FriendProfileProps>): ReactElement {
  const { FriendsProfile } = useMessages().Views;
  const cachedUser = useSelector(selectFriendInfoById(userId));
  const samePeopleInInstance = useSelector(selectFriendInfoByLocation(cachedUser));
  const { getUser } = useApi();

  const tabConfig: TabsConfig<'overview' | 'instance' | 'history' | 'json'>[] = useMemo(
    () => [
      {
        label: FriendsProfile.Tabs.Overview,
        key: 'overview',
      },
      {
        label: FriendsProfile.Tabs.Instance(samePeopleInInstance.length),
        key: 'instance',
        disabled: samePeopleInInstance.length === 0,
      },
      {
        label: FriendsProfile.Tabs.History,
        key: 'history',
        disabled: true,
      },
      {
        label: FriendsProfile.Tabs.JSON,
        key: 'json',
      },
    ],
    [FriendsProfile.Tabs, samePeopleInInstance.length],
  );

  useEffect(() => {
    getUser(userId).finally();
  }, [getUser, userId]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <Button onClick={onCanceled} className={styles.CloseButton} icon>
          <Close />
        </Button>
        <LoadableContent data={cachedUser}>
          {(user) => (
            <>
              <UserCard user={user} />
              <Content translucent>
                <Tabs config={tabConfig}>
                  {(key) => (
                    <>
                      {key === 'overview' && (
                        <ScrollableContent innerClassName={styles.ScrollableContent} translucent>
                          <UserOverview user={user} />
                        </ScrollableContent>
                      )}
                      {key === 'instance' && <WorldInstance user={user} />}
                      {key === 'history' && <HistoryTab user={user} />}
                      {key === 'json' && (
                        <ScrollableContent innerClassName={styles.Content} translucent>
                          <RenderJSON json={user} />
                        </ScrollableContent>
                      )}
                    </>
                  )}
                </Tabs>
              </Content>
            </>
          )}
        </LoadableContent>
      </Dialog>
    </Modal>
  );
}
