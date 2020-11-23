import { Loadable } from '../reducer';

export type VRCApiInfo = {
  clientApiKey: string;
};

export type AppInfoState = Loadable<VRCApiInfo>;

export const INITIAL_API_INFO_STATE: AppInfoState = null;
