import { Loadable } from '../reducer';
import { VRCApiInfo } from './state';
import { SetVRCApiInfo } from './types';

export function setApiInfo(apiInfo: Loadable<VRCApiInfo>): SetVRCApiInfo {
  return {
    type: 'api-info/set-vrc-api-info',
    apiInfo: apiInfo,
  };
}
