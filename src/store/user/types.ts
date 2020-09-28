import { Action } from 'redux';
import { VRCUserState } from './state';

export type UserActionType = 'user/set-vrc-user-info';

export type UserAction<T extends UserActionType> = Action<T>;

export type SetVRCUserState = UserAction<'user/set-vrc-user-info'> & {
  userState: VRCUserState;
};

export type UserActions = SetVRCUserState;
