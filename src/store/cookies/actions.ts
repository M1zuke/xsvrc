import { StoredCookie } from './state';
import { ResetUserCookies, SetUserCookies } from './types';

export function setStoredCookies(cookies: StoredCookie[]): SetUserCookies {
  return {
    type: 'cookie/set-cookies',
    cookies: cookies,
  };
}

export function resetStoredCookies(): ResetUserCookies {
  return {
    type: 'cookie/reset-cookies',
  };
}
