interface ApiConfig {
  apiKey: string;
}

interface UserInfo {
  acceptedTOSVersion: number;
  accountDeletionDate: string | null; // Datestring
  activeFriends: string[];
  allowAvatarCopying: boolean;
  bio: string;
  bioLinks: string[];
  currentAvatar: string;
  currentAvatarAssetUrl: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  developerType: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  feature: TwoFactorAuth;
  friendGroupNames: string[];
  friendKey: string;
  friends: string[];
  hasBirthday: boolean;
  hasEmail: boolean;
  hasLoggedInFromClient: boolean;
  hasPendingEmail: boolean;
  homeLocation: string;
  id: string;
  isFriend: boolean;
  last_login: string; // Datestring
  last_platform: string;
  obfuscatedEmail: string;
  obfuscatePendingEmail: string;
  oculusId: string;
  offlineFriends: string[];
  onlineFriends: string[];
  pastDisplayNames: string[];
  state: string; // 'offline' | 'active'
  status: string; // 'active'
  statusDescription: string;
  steamDetails: SteamDetails;
  steamId: string;
  tags: string[];
  twoFactorAuthEnabled: boolean;
  unsubscribe: boolean;
  username: string;
}

interface SteamDetails {
  // unknown Properties
}

interface TwoFactorAuth {
  twoFactorAuth: boolean;
}

interface AvatarInfo {
  id: string;
  name: string;
  description: string;
  authorId: string;
  authorName: string;
  tags: string[];
  assetUrl: string;
  imageUrl: string;
  thumbnailImageUrl: string;
  releaseStatus: ReleaseStatus;
  version: number;
  featured: boolean;
  unityPackages: UnityPackage[];
  unityPackageUpdated: boolean;
  unityPackageURL: string;
}

interface UnityPackage {
  id: string;
  assetUrl: string;
  unityVersion: string;
  unitySortNumber: number;
  assetVersion: number;
  platform: string;
  created_at: string;
}

type ReleaseStatus = 'public' | 'private' | 'hidden';

interface FriendInfo {
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  developerType: string;
  displayName: string;
  friendKey: string;
  id: string;
  isFriend: boolean;
  last_login: string; // Datestring
  last_platform: string;
  location: string;
  status: string;
  statusDescription: string;
  tags: string[];
  username: string;
}
