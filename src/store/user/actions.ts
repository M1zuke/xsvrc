import { StoredCookie } from './reducer';
import {
  LOG_IN,
  LOG_OUT,
  LogInAction,
  LogOutAction,
  SET_AUTH_TOKEN,
  SetStoredCookiesAction,
  UserActionTypes,
} from './types';


export function logInUser(userInfo: UserInfo): LogInAction {
  return {
    type: LOG_IN,
    payload: userInfo,
  };
}

export function logOutUser(userInfo: UserInfo): LogOutAction {
  return {
    type: LOG_OUT,
    payload: undefined,
  };
}

export function setStoredCookies(storedCookies: StoredCookie[]): SetStoredCookiesAction {
  return {
    type: SET_AUTH_TOKEN,
    payload: storedCookies,
  };
}
