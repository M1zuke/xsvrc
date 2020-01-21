import { LOG_IN, LOG_OUT, UserActionTypes } from './types';


export function logInUser(userInfo: UserInfo): UserActionTypes {
  return {
    type: LOG_IN,
    payload: userInfo,
  };
}

export function logOutUser(userInfo: UserInfo): UserActionTypes {
  return {
    type: LOG_OUT,
    payload: undefined,
  };
}
