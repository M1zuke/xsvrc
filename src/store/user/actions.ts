import { Loadable } from '../reducer';
import { VRCUserInfo } from './state';
import { SetVRCUserInfo } from './types';

export function setUserState(vrcUserInfo: Loadable<VRCUserInfo>): SetVRCUserInfo {
  return {
    type: 'user/set-vrc-user-info',
    userInfo: vrcUserInfo,
  };
}
