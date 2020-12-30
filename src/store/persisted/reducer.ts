import { INITIAL_PERSISTED_STATE, PersistedState, StoredCookie } from './state';
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

export function reducer(state: PersistedState = INITIAL_PERSISTED_STATE, action: CookieActions): PersistedState {
  switch (action.type) {
    case 'cookie/set-cookies': {
      return {
        ...state,
        cookies: [...mergeWithNewCookies(state.cookies, action.cookies)],
      };
    }
    case 'cookie/reset-cookies': {
      return {
        ...state,
        cookies: [],
      };
    }
  }
  return state;
}
