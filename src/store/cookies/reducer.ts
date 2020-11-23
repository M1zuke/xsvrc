import { CookieState, INITIAL_COOKIE_STATE, StoredCookie } from './state';
import { CookieActions } from './types';

function mergeWithNewCookies(oldCookies: StoredCookie[], newCookies: StoredCookie[]): StoredCookie[] {
  const mergedCookies: StoredCookie[] = [...oldCookies];
  newCookies.forEach((cookie) => {
    const foundCookie = mergedCookies.find((c) => c.key === cookie.key);
    if (foundCookie) {
      foundCookie.value = cookie.value;
    } else {
      mergedCookies.push(cookie);
    }
  });
  return mergedCookies;
}

export function reducer(state: CookieState = INITIAL_COOKIE_STATE, action: CookieActions): CookieState {
  switch (action.type) {
    case 'cookie/set-cookies':
      return [...mergeWithNewCookies(state, action.cookies)];
    case 'cookie/reset-cookies':
      return [...INITIAL_COOKIE_STATE];
  }
  return state;
}
