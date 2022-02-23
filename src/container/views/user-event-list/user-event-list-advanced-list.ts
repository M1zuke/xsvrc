import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { AdvancedFilterConfig } from '../../../components/advanced-filter/advanced-filter-types';
import { selectFriendInfo } from '../../../store/friends/selectors';
import { selectUserEvents } from '../../../store/user-events/selectors';
import { UserEvent } from '../../../store/user-events/state';

export function useUserEventListAdvancedList(): AdvancedFilterConfig<UserEvent> {
  const userEvents = useSelector(selectUserEvents);
  const friendInfo = useSelector(selectFriendInfo);

  return useMemo(() => {
    const userInfos = isLoaded(friendInfo) ? Object.values(friendInfo) : [];

    const nameOnlyOnce: string[] = [];
    const eventTypesOnlyOnce: string[] = [];
    userEvents.forEach((ue) => {
      const userName = userInfos.find((ui) => ui.id === ue.userId)?.displayName ?? ue.displayName;

      if (!nameOnlyOnce.includes(userName)) {
        nameOnlyOnce.push(userName);
      }
      if (!eventTypesOnlyOnce.includes(ue.eventType)) {
        eventTypesOnlyOnce.push(ue.eventType);
      }
    });

    return {
      id: 'UserEventList-Filter',
      config: [
        {
          key: 'displayName',
          show: true,
          label: 'Username',
          options: nameOnlyOnce.map((name) => ({
            value: name,
            label: name,
          })),
        },
        {
          key: 'eventType',
          label: 'Event type',
          options: eventTypesOnlyOnce.map((type) => ({
            value: type,
            label: type,
          })),
        },
      ],
    };
  }, [friendInfo, userEvents]);
}
