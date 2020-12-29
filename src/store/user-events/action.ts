import { WorldInfo } from '../../api/types';
import { UserEvent } from './state';
import { AddUserEvent, SaveWorldInfo } from './types';

export function addUserEvent(userEvent: Omit<UserEvent, 'timestamp'>): AddUserEvent {
  const timestamp = new Date();
  return {
    type: 'user-event/add-event',
    userEvent: {
      ...userEvent,
      timestamp: timestamp,
    },
  };
}

export function saveWorldInfo(worldInfo: WorldInfo): SaveWorldInfo {
  return {
    type: 'user-event/save-world-info',
    worldInfo,
  };
}
