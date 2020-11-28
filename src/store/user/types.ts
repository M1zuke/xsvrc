import { Action } from 'redux';
import { Loadable } from '../reducer';
import { EnrichedAuthenticatedUserInfo } from './state';

export type UserActionType = 'user/set-vrc-user-info' | 'user/set-cookies' | 'user/reset-cookies';

export type UserAction<T extends UserActionType> = Action<T>;

export type SetVRCUserInfo = UserAction<'user/set-vrc-user-info'> & {
  userInfo: Loadable<EnrichedAuthenticatedUserInfo>;
};

export type UserActions = SetVRCUserInfo;
