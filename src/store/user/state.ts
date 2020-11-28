import { TrustTag } from '../../common/trust-system';
import { UserInfo } from '../friends/state';
import { Loadable } from '../reducer';

export type VRCState = 'online' | 'active' | 'offline';
export type VRCUserStatus = 'active' | 'join me' | 'ask me' | 'busy' | 'offline';
type VRCDeveloperType = 'none' | 'trusted' | 'internal' | 'moderator';
type VRCPastDisplayNames = {
  displayName: string;
  updated_at: string;
};

type VRCUserFeature = {
  twoFactorAuth: boolean;
};

type AuthenticatedUserInfo = {
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
  tags: TrustTag[];
  feature: VRCUserFeature;
  developerType: VRCDeveloperType;
  isFriend: boolean;
  friendKey: string;
  userIcon: string;
};

export type EnrichedAuthenticatedUserInfo = AuthenticatedUserInfo & UserInfo;

export type VRCUserState = Loadable<EnrichedAuthenticatedUserInfo>;

export const INITIAL_USER_STATE: VRCUserState = null;
