import { InstanceInfo, WorldInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { WorldInfos } from './state';
import { SetInstanceInfo, SetWorldInfo } from './types';

export function setWorldInfo(worldId: WorldInfo['id'], worldInfo: Loadable<WorldInfos>): SetWorldInfo {
  return {
    type: 'worlds/set-world-info',
    worldId,
    worldInfo,
  };
}

export function setInstanceInfo(
  location: InstanceInfo['location'],
  instanceInfo: Loadable<InstanceInfo>,
): SetInstanceInfo {
  return {
    type: 'worlds/set-instance-info',
    location,
    instanceInfo,
  };
}
