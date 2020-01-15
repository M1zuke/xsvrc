interface ApiConfig {
  apiKey?: string;
}

interface UserInfo {
  acceptedTOSVersion?: number;
  accountDeletionDate?: string | null; // Datestring
  activeFriends?: string[];
  allowAvatarCopying?: boolean;
  bio?: string;
  bioLinks?: string[];
  currentAvatar?: string;
  currentAvatarAssetUrl?: string;
  currentAvatarImageUrl?: string;
  currentAvatarThumbnailImageUrl?: string;
  developerType?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  feature?: TwoFactorAuth;
  friendGroupNames?: string[];
  friendKey?: string;
  friends?: string[];
  hasBirthday?: boolean;
  hasEmail?: boolean;
  hasLoggedInFromClient?: boolean;
  hasPendingEmail?: boolean;
  homeLocation?: string;
  id?: string;
  isFriend?: boolean;
  last_login?: string; // Datestring
  last_platform?: string;
  obfuscatedEmail?: string;
  obfuscatePendingEmail?: string;
  oculusId?: string;
  offlineFriends?: string[];
  onlineFriends?: string[];
  pastDisplayNames?: string[];
  state?: string; // 'offline' | 'active'
  status?: string; // 'active'
  statusDescription?: string;
  steamDetails?: SteamDetails;
  steamId?: string;
  tags?: string[];
  twoFactorAuthEnabled?: boolean;
  unsubscribe?: boolean;
  username?: string;
}

interface SteamDetails {
  // unknown Properties
}

interface TwoFactorAuth {
  twoFactorAuth: boolean;
}
