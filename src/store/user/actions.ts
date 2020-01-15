import { LOG_IN, LOG_OUT, UPDATE_USER_INFO, UserActionTypes } from './types';

export function updateUserInfo(newUserInfo: Partial<UserInfo>): UserActionTypes {
  return {
    type: UPDATE_USER_INFO,
    payload: newUserInfo,
  };
}

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
