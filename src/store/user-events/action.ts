import { WorldInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { UserEvent } from './state';
import { AddUserEvent, ResetUserEvents, SaveWorldInfo } from './types';

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

export function saveWorldInfo(id: WorldInfo['id'], worldInfo: Loadable<WorldInfo>): SaveWorldInfo {
  return {
    type: 'user-event/save-world-info',
    worldInfo,
    id,
  };
}

export function resetUserEvent(): ResetUserEvents {
  return {
    type: 'user-event/reset',
  };
}
