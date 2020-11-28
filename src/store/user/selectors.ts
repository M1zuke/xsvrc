import { AppState } from '../index';
import { Loadable } from '../reducer';
import { AuthenticatedUserInfo } from './state';

export const vrcUserInfo = (state: AppState): Loadable<AuthenticatedUserInfo> => state.userInfo;
