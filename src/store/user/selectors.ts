import { AppState } from '../index';
import { Loadable } from '../reducer';
import { VRCUserInfo } from './state';

export const vrcUserInfo = (state: AppState): Loadable<VRCUserInfo> => state.userInfo;
