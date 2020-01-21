export const LOG_IN: string = 'LOG_IN';
export const LOG_OUT: string = 'LOG_OUT';

export interface LogInAction {
  type: typeof LOG_IN;
  payload: UserInfo;
}

export interface LogOutAction {
  type: typeof LOG_OUT;
  payload: undefined;
}

export type UserActionTypes =
    | LogInAction
    | LogOutAction;
