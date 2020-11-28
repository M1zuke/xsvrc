import { Loadable } from '../reducer';
import { EnrichedAuthenticatedUserInfo } from './state';
import { SetVRCUserInfo } from './types';

export function setUserState(vrcUserInfo: Loadable<EnrichedAuthenticatedUserInfo>): SetVRCUserInfo {
  return {
    type: 'user/set-vrc-user-info',
    userInfo: vrcUserInfo,
  };
}
