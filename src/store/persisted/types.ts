import { Action } from 'redux';
import { StoredCookie } from './state';

export type CookieActionType = 'cookie/set-cookies' | 'cookie/reset-cookies';

export type CookieAction<T extends CookieActionType> = Action<T>;

export type SetUserCookies = CookieAction<'cookie/set-cookies'> & {
  cookies: StoredCookie[];
};

export type ResetUserCookies = CookieAction<'cookie/reset-cookies'>;

export type CookieActions = SetUserCookies | ResetUserCookies;
