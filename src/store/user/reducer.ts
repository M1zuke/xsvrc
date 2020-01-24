import { LOG_IN, LOG_OUT, LogInAction, LogOutAction, UserActionTypes } from './types';
import { isAction } from '../../costumTypes/typeUtils';

export interface UserState {
  loggedIn: boolean;
  userInfo: UserInfo;
}

const initialState: UserState = {
  loggedIn: false,
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
    return { ...state, loggedIn: true, userInfo: { ...action.payload } };
  }

  if (isAction<LogOutAction>(action, LOG_OUT)) {
    return initialState;
  }

  return state;
}
