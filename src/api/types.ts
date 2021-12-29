import { TrustTag } from '../common/trust-system';

export type ShortUserInfo = {
  bio: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  developerType: DeveloperType;
  displayName: string;
  fallbackAvatar: string;
  id: string;
  isFriend: boolean;
  last_platform: keyof Platforms;
  profilePicOverride: string;
  tags: TrustTag[];
  userIcon: string;
  username: string;
};

export type UserInfo = ShortUserInfo & {
  bioLinks: string[];
  state: State;
  status: Status;
  statusDescription: string;
  last_activity: string;
  last_login: string;
  allowAvatarCopying: boolean;
  friendKey: string;
  location: Location | ''; // can be empty for some reason
  worldId: string;
  instanceId: string;
};

type Location = string;

export type State = 'online' | 'active' | 'offline';
export type Status = 'active' | 'join me' | 'ask me' | 'busy' | 'offline';
export type DeveloperType = 'none' | 'trusted' | 'internal' | 'moderator';
type PastDisplayNames = {
  displayName: string;
  updated_at: string;
};

type UserFeature = {
  twoFactorAuth: boolean;
};

export type AuthenticatedUserInfo = UserInfo & {
  pastDisplayNames: PastDisplayNames[];
  email: string;
  emailVerified: boolean;
  hasEmail: boolean;
  hasPendingEmail: boolean;
  obfuscatedEmail: string;
  obfuscatedPendingEmail: string;
  steamId: string;
  steamDetails: unknown;
  oculusId: string;
  acceptedTOSVersion: number;
  hasBirthday: boolean;
  friends: string[];
  onlineFriends: string[];
  activeFriends: string[];
  offlineFriends: string[];
  friendGroupNames: string[]; // can be empty if not customized :(
  currentAvatar: string;
  currentAvatarAssetUrl: string;
  homeLocation: string;
  hasLoggedInFromClient: boolean;
  twoFactorAuthEnabled: boolean;
  accountDeletionDate: string | null;
  unsubscribe: boolean;
  feature: UserFeature;
};

export type FriendUpdateWithUser = {
  type: 'friend-active' | 'friend-add' | 'friend-update';
  content: {
    userId: string;
    user: UserInfo;
  };
};

export type FriendUpdatesUserId = {
  type: 'friend-offline' | 'friend-delete';
  content: {
    userId: string;
  };
};

export type Platforms = {
  standalonewindows: number;
  android: number;
};

export type InstanceInfo = {
  active: boolean;
  canRequestInvite: boolean;
  capacity: number;
  clientNumber: unknown;
  full: boolean;
  id: string;
  instanceId: string;
  location: string;
  n_users: number;
  name: string;
  nonce: string;
  ownerId: string | null;
  permanent: boolean;
  photonRegion: unknown;
  platforms: Platforms;
  private: string; // maybe optional
  region: string;
  shortName: string;
  tags: string[];
  type: 'hidden' | 'friends' | 'public' | 'private';
  users?: UserInfo[];
  worldId: string;
};

type InstanceArray = [string, number];

type UnityPackages = {
  assetUrl?: string;
  /**
   * @deprecated Always returns as empty use assetUrl instead
   */
  assetUrlObject?: unknown;
  assetVersion: number;
  created_at?: string;
  id: string;
  platform: string;
  pluginUrl?: string;
  pluginUrlObject?: unknown;
  unitySortNumber?: number;
  unityVersion: string;
};

export type WorldInfo = {
  assetUrl: string;
  assetUrlObject: unknown;
  authorId: string;
  authorName: string;
  capacity: number;
  created_at: string;
  description: string;
  favorites: number;
  featured: boolean;
  heat: number;
  id: string;
  imageUrl: string;
  instances: InstanceArray[];
  labsPublicationDate: string;
  name: string;
  namespace: string;
  occupants: number;
  organization: string;
  popularity: number;
  previewYoutubeId: string | null;
  privateOccupants: number;
  publicOccupants: number;
  publicationDate: string;
  releaseStatus: 'public';
  tags: string[];
  thumbnailImageUrl: string;
  unityPackageUrlObject: unknown;
  unityPackages: UnityPackages[];
  updated_at: string;
  version: number;
  visits: number;
};

export type UserLocationUpdate = {
  type: 'user-location';
  content: {
    instance: string;
    location: string;
    userId: string;
    world: WorldInfo;
  };
};

export type UserUpdate = {
  type: 'user-update';
  content: {
    user: Pick<
      AuthenticatedUserInfo,
      | 'bio'
      | 'currentAvatar'
      | 'currentAvatarAssetUrl'
      | 'currentAvatarImageUrl'
      | 'currentAvatarThumbnailImageUrl'
      | 'displayName'
      | 'fallbackAvatar'
      | 'id'
      | 'profilePicOverride'
      | 'status'
      | 'statusDescription'
      | 'tags'
      | 'userIcon'
      | 'username'
    >;
    userId: string;
  };
};

export type FriendLocationUpdate = {
  type: 'friend-location' | 'friend-online';
  content: {
    userId: string;
    user: UserInfo;
    world: WorldInfo;
    location: string;
    instance: string;
    canRequestInvite: boolean;
  };
};

type InviteNotification = {
  type: 'invite';
  details: {
    worldId: string;
    worldName: string;
  };
};

type RequestInviteNotification = {
  type: 'requestInvite';
  details: {
    platform: string;
  };
};

type VoteToKickNotification = {
  type: 'votetokick';
  details: {
    userToKickId: string;
    initiatorUserId: string;
  };
};

type FriendRequestNotificationDetails = {
  type: 'friendRequest';
  details: Record<string, unknown>;
};

type NotificationDetails =
  | InviteNotification
  | RequestInviteNotification
  | VoteToKickNotification
  | FriendRequestNotificationDetails;

export type NotificationContent = NotificationDetails & {
  id: string;
  senderUsername: string;
  senderUserId: string;
  message: string;
  seen: boolean;
  created_at: string;
};

export type NotificationDTO = Omit<NotificationContent, 'details'> & {
  details: string;
};

export type Notification = {
  type: 'notification';
  content: NotificationContent;
};
export type FriendNotification = FriendLocationUpdate | FriendUpdatesUserId | FriendUpdateWithUser;
export type UserNotification = UserLocationUpdate | UserUpdate;
export type WebSocketNotification = Notification | FriendNotification | UserNotification;

export function isFriendNotification(
  websocketNotification: WebSocketNotification,
): websocketNotification is FriendNotification {
  return (
    websocketNotification.type === 'friend-active' ||
    websocketNotification.type === 'friend-add' ||
    websocketNotification.type === 'friend-online' ||
    websocketNotification.type === 'friend-update' ||
    websocketNotification.type === 'friend-offline' ||
    websocketNotification.type === 'friend-location' ||
    websocketNotification.type === 'friend-delete'
  );
}

export function isUserNotification(
  websocketNotification: WebSocketNotification,
): websocketNotification is UserNotification {
  return websocketNotification.type === 'user-location' || websocketNotification.type === 'user-update';
}

export function isNotification(websocketNotification: WebSocketNotification): websocketNotification is Notification {
  return websocketNotification.type === 'notification';
}

export function isErrorNotification(notification: RawWebsocketNotification): notification is ErrorNotification {
  return 'err' in notification && 'authToken' in notification && 'ip' in notification;
}

export type RawWebsocketNotification =
  | ErrorNotification
  | {
      type: WebSocketNotification['type'];
      content: string;
    };

type ErrorNotification = {
  authToken: string;
  err: string;
  ip: string;
};

export type MappedFavoritesToGroupWithUser = {
  [key: string]: (UserInfo | 'not-found' | string)[];
};
export type MappedFavoritesToGroup = {
  [key: string]: Favorite[] | undefined;
};
export type MappedFavoritesToType = Record<FavoriteType, MappedFavoritesToGroup>;

export const FavoriteTypes = ['world', 'friend', 'avatar'] as const;
export type FavoriteType = typeof FavoriteTypes[number];

export type Favorite = {
  type: FavoriteType;
  id: string;
  favoriteId: string;
  tags: string[];
};

const VisibilityTypes = ['private', 'friends', 'public'] as const;
type Visibility = typeof VisibilityTypes[number];

export type FavoriteGroup = {
  displayName: string;
  id: string;
  name: string;
  ownerDisplayName: string;
  ownerId: string;
  tags: string[];
  type: FavoriteType;
  visibility: Visibility;
};

export type NamedFavorite = Favorite & {
  groupName: string;
};

export type AddFavorite = Omit<Favorite, 'id'>;

export const HardModerationTypes = ['mute', 'block', 'hideAvatar'] as const;
export type HardModerationType = typeof HardModerationTypes[number];

export const ModerationTypes = ['unmute', 'unblock', 'showAvatar'] as const;
type ModerationType = typeof ModerationTypes[number] & HardModerationType;

export type Moderation = {
  created: string; // date-time
  id: string;
  sourceDisplayName: string;
  sourceUserId: string;
  targetDisplayName: string;
  targetUserId: string;
  type: ModerationType;
};

export type SortedModerations = {
  [userId: string]: Moderation[];
};

export type AvatarInfo = {
  assetUrl?: string;
  /**
   * @deprecated Always returns as empty use assetUrl instead
   */
  assetUrlObject?: unknown;
  authorId: string;
  authorName: string;
  created_at: string; // date-time
  description: string;
  featured: boolean;
  id: string;
  imageUrl: string;
  name: string;
  releaseStatus: 'public' | 'private' | 'hidden';
  tags: string[];
  thumbnailImageUrl: string;
  unityPackageUrl: string;
  /**
   * @deprecated Always returns as empty use unityPackageUrl instead
   */
  unityPackageUrlObject: unknown;
  unityPackages: UnityPackages[];
  updated_at: string; // date-time
  version: number;
};
