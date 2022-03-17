import { UserInfo } from '../../api/types';

export type HistoryState = Record<UserInfo['id'], UserInfo['location'][]>;

export const INITIAL_HISTORY_STATE: HistoryState = {};
