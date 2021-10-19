import { Action } from 'redux';
import { InstanceInfo } from '../../api/types';
import { Loadable } from '../reducer';
import { WorldInfos } from './state';

export type WorldsActionType = 'worlds/set-instance-info' | 'worlds/set-world-info';

export type WorldsAction<T extends WorldsActionType> = Action<T>;

export type SetInstanceInfo = WorldsAction<'worlds/set-instance-info'> & {
  location: string;
  instanceInfo: Loadable<InstanceInfo>;
};

export type SetWorldInfo = WorldsAction<'worlds/set-world-info'> & {
  worldId: string;
  worldInfo: Loadable<WorldInfos>;
};

export type WorldsActions = SetInstanceInfo | SetWorldInfo;
