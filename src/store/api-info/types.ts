import { Action } from 'redux';
import { Loadable } from '../reducer';
import { VRCApiInfo } from './state';

export type ApiInfoActionType = 'api-info/set-vrc-api-info';

export type ApiInfoAction<T extends ApiInfoActionType> = Action<T>;

export type SetVRCApiInfo = ApiInfoAction<'api-info/set-vrc-api-info'> & {
  apiInfo: Loadable<VRCApiInfo>;
};

export type ApiInfoActions = SetVRCApiInfo;
