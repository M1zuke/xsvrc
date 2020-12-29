import { Action } from 'redux';
import { WorldInfo } from '../../api/types';
import { UserEvent } from './state';

export type UserEventActionType = 'user-event/add-event' | 'user-event/save-world-info';

export type UserEventAction<T extends UserEventActionType> = Action<T>;

export type AddUserEvent = UserEventAction<'user-event/add-event'> & {
  userEvent: UserEvent;
};

export type SaveWorldInfo = UserEventAction<'user-event/save-world-info'> & {
  worldInfo: WorldInfo;
};

export type UserEventActions = AddUserEvent | SaveWorldInfo;
