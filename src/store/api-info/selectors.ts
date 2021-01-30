import { AppState } from '../index';
import { Loadable } from '../reducer';
import { VRCApiInfo } from './state';

export const selectApiInfo = (state: AppState): Loadable<VRCApiInfo> => state.apiInfo;
