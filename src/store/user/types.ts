import { UserState } from './reducer';

export const UPDATE_USER_INFO: string = 'UPDATE_USER_INFO';
export const LOG_IN: string = 'LOG_IN';
export const LOG_OUT: string = 'LOG_OUT';

export interface UpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO;
  payload: Partial<UserInfo>;
}

export interface LogInAction {
  type: typeof LOG_IN;
  payload: UserState;
}

export interface LogOutAction {
  type: typeof LOG_OUT;
  payload: undefined;
}

export type UserActionTypes =
    | UpdateUserInfoAction
    | LogInAction
    | LogOutAction;
