import { VRCUserState } from './state';
import { SetVRCUserState } from './types';

export function setUserState(userState: VRCUserState): SetVRCUserState {
  return {
    type: 'user/set-vrc-user-info',
    userState: userState,
  };
}
