import { InstanceInfo, WorldInfo } from '../../api/types';
import { Loadable } from '../reducer';

export type WorldInfos = WorldInfo | 'private' | 'offline';
export type WorldsState = {
  instances: Record<InstanceInfo['location'], Loadable<InstanceInfo>>;
  worlds: Record<WorldInfo['id'], Loadable<WorldInfos>>;
};

export const INITIAL_WORLD_STATE: WorldsState = {
  worlds: {
    private: 'private',
    offline: 'offline',
  },
  instances: {},
};
