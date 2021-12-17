import { isLoaded } from '../../api/prepare';
import { InstanceInfo } from '../../api/types';
import { AppState } from '../index';
import { Loadable } from '../reducer';
import { WorldInfos } from './state';

export const selectWorldByLocation =
  (location: string) =>
  (state: AppState): Loadable<WorldInfos> => {
    const [id] = location.split(':');
    return state.worlds.worlds[id] ?? null;
  };

export const selectInstanceByInstance =
  (location: string) =>
  (state: AppState): Loadable<InstanceInfo> => {
    return state.worlds.instances[location] ?? null;
  };

export type CustomInstanceTypes = 'friends' | 'hidden' | 'public' | 'private-plus' | 'private' | 'unknown';

export const GetInstanceTypeInfo =
  (location: string) =>
  (state: AppState): CustomInstanceTypes => {
    const instanceInfo = state.worlds.instances[location];
    if (isLoaded(instanceInfo)) {
      switch (instanceInfo.type) {
        case 'friends':
        case 'hidden':
        case 'public':
          return instanceInfo.type;
        case 'private': {
          if (instanceInfo.canRequestInvite) {
            return 'private-plus';
          }
          return 'private';
        }
      }
    }
    return 'unknown';
  };
