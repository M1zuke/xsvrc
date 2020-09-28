import { INITIAL_USER_STATE, VRCUserState } from './state';
import { UserActions } from './types';

export function reducer(state: VRCUserState = INITIAL_USER_STATE, action: UserActions): VRCUserState {
  return state;
}
