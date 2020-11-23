import { Loadable } from '../reducer';

type VRCState = 'online' | 'active' | 'offline';
type VRCUserStatus = 'active' | 'join me' | 'ask me' | 'busy' | 'offline';
type VRCDeveloperType = 'none' | 'trusted' | 'internal' | 'moderator';
type VRCPastDisplayNames = {
  displayName: string;
  updated_at: string;
};

type VRCUserFeature = {
  twoFactorAuth: boolean;
};

export type VRCUserInfo = {
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
  steamDetails: {};
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
  feature: VRCUserFeature;
  developerType: VRCDeveloperType;
  isFriend: boolean;
  friendKey: string;
};

export type VRCUserState = Loadable<VRCUserInfo>;

export const INITIAL_USER_STATE: VRCUserState = null;
