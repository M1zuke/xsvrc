import { INITIAL_USER_STATE, VRCUserState } from './state';
import { UserActions } from './types';

export function reducer(state: VRCUserState = INITIAL_USER_STATE, action: UserActions): VRCUserState {
  switch (action.type) {
    case 'user/set-vrc-user-info':
      return action.userInfo;
  }
  return state;
}
