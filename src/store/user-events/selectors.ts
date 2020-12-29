import { AppState } from '../index';
import { UserEvent, WorldInfos } from './state';

export const selectUserEvents = (state: AppState): UserEvent[] => state.userEvents.userEvents;
export const selectWorldByLocation = (location: string) => (state: AppState): WorldInfos | null => {
  const [id] = location.split(':');
  return state.userEvents.worlds[id] ?? null;
};
