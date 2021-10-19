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

export const selectInstance =
  (location: string) =>
  (state: AppState): Loadable<InstanceInfo> => {
    return state.worlds.instances[location] ?? null;
  };
