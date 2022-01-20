import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AdvancedFilterConfig } from '../../../components/advanced-filter/advanced-filter-types';
import { selectUserEvents } from '../../../store/user-events/selectors';
import { UserEvent } from '../../../store/user-events/state';

export function useUserEventListAdvancedList(): AdvancedFilterConfig<UserEvent> {
  const userEvents = useSelector(selectUserEvents);
  return useMemo(() => {
    const nameOnlyOnce: string[] = [];
    const eventTypesOnlyOnce: string[] = [];
    userEvents.forEach((ue) => {
      if (!nameOnlyOnce.includes(ue.displayName)) {
        nameOnlyOnce.push(ue.displayName);
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
  }, [userEvents]);
}
