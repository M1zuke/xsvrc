import { AppState } from '../index';
import { UserEvent } from './state';

export const selectUserEvents = (state: AppState): UserEvent[] => state.userEvents;
