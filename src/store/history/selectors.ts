import { UserInfo } from '../../api/types';
import { AppState } from '../index';

export const selectUserHistory =
  (id: UserInfo['id']) =>
  (state: AppState): UserInfo['location'][] =>
    state.history[id] || [];
