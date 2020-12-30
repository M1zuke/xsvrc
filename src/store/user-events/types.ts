import { Action } from 'redux';
import { WorldInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { UserEvent } from './state';

export type UserEventActionType = 'user-event/add-event' | 'user-event/save-world-info' | 'user-event/reset';

export type UserEventAction<T extends UserEventActionType> = Action<T>;

export type AddUserEvent = UserEventAction<'user-event/add-event'> & {
  userEvent: UserEvent;
};

export type SaveWorldInfo = UserEventAction<'user-event/save-world-info'> & {
  id: WorldInfo['id'];
  worldInfo: Loadable<WorldInfo>;
};

export type ResetUserEvents = UserEventAction<'user-event/reset'>;

export type UserEventActions = AddUserEvent | SaveWorldInfo | ResetUserEvents;
