import { StoredCookie } from './reducer';

export const LOG_IN: string = 'LOG_IN';
export const LOG_OUT: string = 'LOG_OUT';
export const SET_AUTH_TOKEN: string = 'SET_AUTH_TOKEN';


export interface LogInAction {
  type: typeof LOG_IN;
  payload: UserInfo;
}

export interface LogOutAction {
  type: typeof LOG_OUT;
  payload: undefined;
}

export interface SetStoredCookiesAction {
  type: typeof SET_AUTH_TOKEN;
  payload: StoredCookie[];
}

export type UserActionTypes =
  | LogInAction
  | LogOutAction
  | SetStoredCookiesAction;
