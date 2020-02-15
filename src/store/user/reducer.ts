import { isAction } from '../../costumTypes/typeUtils';
import {
  LOG_IN,
  LOG_OUT,
  LogInAction,
  LogOutAction,
  SET_AUTH_TOKEN,
  SetStoredCookiesAction,
  UserActionTypes,
} from './types';

export interface UserState {
  loggedIn: boolean;
  storedCookies: StoredCookie[];
  userInfo: UserInfo;
}

export interface StoredCookie {
  key: string;
  value: string;
  url: string;
}

const initialState: UserState = {
  loggedIn: false,
  storedCookies: [],
  userInfo: {
    acceptedTOSVersion: -1,
    accountDeletionDate: null, // Datestring
    activeFriends: [],
    allowAvatarCopying: false,
    bio: '',
    bioLinks: [],
    currentAvatar: '',
    currentAvatarAssetUrl: '',
    currentAvatarImageUrl: '',
    currentAvatarThumbnailImageUrl: '',
    developerType: '',
    displayName: '',
    email: '',
    emailVerified: false,
    feature: {
      twoFactorAuth: false,
    },
    friendGroupNames: [],
    friendKey: '',
    friends: [],
    hasBirthday: false,
    hasEmail: false,
    hasLoggedInFromClient: false,
    hasPendingEmail: false,
    homeLocation: '',
    id: '',
    isFriend: false,
    last_login: '', // Datestring
    last_platform: '',
    obfuscatedEmail: '',
    obfuscatePendingEmail: '',
    oculusId: '',
    offlineFriends: [],
    onlineFriends: [],
    pastDisplayNames: [],
    state: '', // 'offline' | 'active'
    status: '', // 'active'
    statusDescription: '',
    steamDetails: {},
    steamId: '',
    tags: [],
    twoFactorAuthEnabled: false,
    unsubscribe: false,
    username: '',
  },
};

export function userReducer(state: UserState = initialState, action: UserActionTypes): UserState {
  if (isAction<LogInAction>(action, LOG_IN)) {
    return {...state, loggedIn: true, userInfo: {...action.payload}};
  }

  if (isAction<LogOutAction>(action, LOG_OUT)) {
    return initialState;
  }

  if (isAction<SetStoredCookiesAction>(action, SET_AUTH_TOKEN)) {
    const newStoredCookies: StoredCookie[] = [...state.storedCookies];
    action.payload.forEach((cookie: StoredCookie) => {
      const currentCookie = newStoredCookies.find((c: StoredCookie) => {
        return c.key === cookie.key;
      });
      if (currentCookie) {
        console.log(currentCookie.key, 'matched', 'overwriting');
        currentCookie.value = cookie.value;
      } else {
        newStoredCookies.push({...cookie});
      }
    });

    return {
      ...state,
      storedCookies: newStoredCookies,
    };
  }

  return state;
}
