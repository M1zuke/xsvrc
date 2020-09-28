type VRCState = 'online' | 'active' | 'offline';
type VRCUserStatus = 'active' | 'join me' | 'ask me' | 'busy' | 'offline';
type VRCDeveloperType = 'none' | 'trusted' | 'internal' | 'moderator';
type VRCPastDisplayNames = {
  displayName: string;
  updated_at: string;
};

export type VRCUserState = {
  username: string;
  displayName: string;
  pastDisplayNames: VRCPastDisplayNames[];
  id: string;
  bio: string;
  bioLinks: string[];
  email: string;
  emailVerified: boolean;
  hasEmail: boolean;
  hasPendingEmail: boolean;
  obfuscatedEmail: string;
  obfuscatedPendingEmail: string;
  steamId: string;
  steamDetails: unknown[];
  oculusId: string;
  acceptedTOSVersion: number;
  hasBirthday: boolean;
  friends: string[];
  onlineFriends: string[];
  activeFriends: string[];
  offlineFriends: string[];
  friendGroupNames: string[];
  state: VRCState;
  status: VRCUserStatus;
  statusDescription: string;
  currentAvatar: string;
  currentAvatarAssetUrl: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  homeLocation: string;
  last_login: string;
  last_platform: string;
  hasLoggedInFromClient: boolean;
  twoFactorAuthEnabled: boolean;
  allowAvatarCopying: boolean;
  accountDeletionDate: string | null;
  unsubscribe: boolean;
  tags: string[];
  feature: unknown[];
  developerType: VRCDeveloperType;
  isFriend: boolean;
  friendKey: string;
};

export const INITIAL_USER_STATE: VRCUserState = {
  username: '',
  displayName: '',
  pastDisplayNames: [],
  id: '',
  bio: '',
  bioLinks: [],
  email: '',
  emailVerified: false,
  hasEmail: false,
  hasPendingEmail: false,
  obfuscatedEmail: '',
  obfuscatedPendingEmail: '',
  steamId: '',
  steamDetails: [],
  oculusId: '',
  acceptedTOSVersion: -1,
  hasBirthday: false,
  friends: [],
  onlineFriends: [],
  activeFriends: [],
  offlineFriends: [],
  friendGroupNames: [],
  state: 'offline',
  status: 'offline',
  statusDescription: '',
  currentAvatar: '',
  currentAvatarAssetUrl: '',
  currentAvatarImageUrl: '',
  currentAvatarThumbnailImageUrl: '',
  homeLocation: '',
  // eslint-disable-next-line @typescript-eslint/camelcase
  last_login: '',
  // eslint-disable-next-line @typescript-eslint/camelcase
  last_platform: '',
  hasLoggedInFromClient: false,
  twoFactorAuthEnabled: false,
  allowAvatarCopying: false,
  accountDeletionDate: '',
  unsubscribe: false,
  tags: [],
  feature: [],
  developerType: 'none',
  isFriend: false,
  friendKey: '',
};
