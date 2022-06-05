import React, { useMemo } from 'react';
import { AuthenticatedUserInfo, UserInfo } from '../../../../api/types';
import { RenderJSON } from '../../../../components/render-json/RenderJSON';
import { ScrollableContent } from '../../../../components/scrollable-content/ScrollableContent';
import { TabsConfig } from '../../../../components/tabs/Tabs';
import { WorldInstance } from '../../../../components/world-instance/WorldInstance';
import { useMessages } from '../../../../i18n';
import styles from './FriendsProfileModal.module.scss';
import { HistoryTab } from './history/HistoryTab';
import { UserOverview } from './UserOverview';

export function useFriendProfileTabModel(
  samePeopleInInstance: (AuthenticatedUserInfo | UserInfo)[],
): TabsConfig<UserInfo, 'overview' | 'instance' | 'history' | 'json'>[] {
  const { FriendsProfile } = useMessages().Views;

  return useMemo(
    () => [
      {
        label: FriendsProfile.Tabs.Overview,
        key: 'overview',
        content: (user) => (
          <ScrollableContent innerClassName={styles.ScrollableContent} translucent>
            <UserOverview user={user} />
          </ScrollableContent>
        ),
      },
      {
        label: FriendsProfile.Tabs.Instance(samePeopleInInstance.length),
        key: 'instance',
        disabled: samePeopleInInstance.length === 0,
        content: (user) => <WorldInstance user={user} />,
      },
      {
        label: FriendsProfile.Tabs.History,
        key: 'history',
        disabled: true,
        content: (user) => <HistoryTab user={user} />,
      },
      {
        label: FriendsProfile.Tabs.JSON,
        key: 'json',
        content: (user) => (
          <ScrollableContent innerClassName={styles.Content} translucent>
            <RenderJSON json={user} />
          </ScrollableContent>
        ),
      },
    ],
    [FriendsProfile.Tabs, samePeopleInInstance.length],
  );
}
