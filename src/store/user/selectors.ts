import { AppState } from '../index';
import { VRCUserState } from './state';

export const userInfo = (state: AppState): VRCUserState => state.userState;
