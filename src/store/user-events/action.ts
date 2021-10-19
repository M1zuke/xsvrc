import { UserEvent } from './state';
import { AddUserEvent, ResetUserEvents } from './types';

export function addUserEvent(userEvent: Omit<UserEvent, 'timestamp' | 'eventKey'>): AddUserEvent {
  const timestamp = new Date();
  return {
    type: 'user-event/add-event',
    userEvent: {
      ...userEvent,
      timestamp: timestamp,
    },
  };
}

export function resetUserEvent(): ResetUserEvents {
  return {
    type: 'user-event/reset',
  };
}
