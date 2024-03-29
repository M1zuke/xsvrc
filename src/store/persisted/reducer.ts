import { INITIAL_PERSISTED_STATE, PersistedState, StoredCookie } from './state';
import { PersistedActions } from './types';

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

export function reducer(state: PersistedState = INITIAL_PERSISTED_STATE, action: PersistedActions): PersistedState {
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
    case 'settings/setSettings': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
    }
  }
  return state;
}
