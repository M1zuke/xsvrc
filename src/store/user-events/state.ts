import { UserInfo, WorldInfo } from '../../api/types';

export type UserEvent<T extends UserInfo = UserInfo, K extends keyof T = keyof T> = {
  timestamp: Date;
  displayName: T['displayName'];
  key: K;
  previous: T[K];
  current: T[K];
  eventKey: number;
};

export type WorldInfos = WorldInfo | 'private' | 'offline';
export type WorldState = Record<WorldInfo['id'], WorldInfos>;
export type UserEventState = {
  userEvents: UserEvent[];
  worlds: WorldState;
};

export const INITIAL_USER_EVENT_STATE: UserEventState = {
  userEvents: [],
  worlds: {
    private: 'private',
    offline: 'offline',
  },
};
