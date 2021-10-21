import { TrustTag } from '../common/trust-system';

export type UserInfo = {
  username: string;
  displayName: string;
  id: string;
  bio: string;
  bioLinks: string[];
  state: State;
  status: Status;
  statusDescription: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  fallbackAvatar: string;
  userIcon: string;
  profilePicOverride: string;
  last_login: string;
  last_platform: string;
  allowAvatarCopying: boolean;
  tags: TrustTag[];
  developerType: DeveloperType;
  isFriend: boolean;
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

export type AuthenticatedUserInfo = {
  username: string;
  displayName: string;
  pastDisplayNames: PastDisplayNames[];
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
  steamDetails: unknown;
  oculusId: string;
  acceptedTOSVersion: number;
  hasBirthday: boolean;
  friends: string[];
  onlineFriends: string[];
  activeFriends: string[];
  offlineFriends: string[];
  friendGroupNames: string[];
  state: State;
  status: Status;
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
  feature: UserFeature;
  developerType: DeveloperType;
  isFriend: boolean;
  friendKey: string;
  userIcon: string;
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
  ownerId: string;
  permanent: boolean;
  photonRegion: unknown;
  platforms: Platforms;
  shortName: string;
  tags: string[];
  type: 'hidden' | 'friends' | 'public';
  worldId: string;
};

export type WorldInfo = {
  name: string;
  description: string;
  id: string;
  authorName: string;
  authorId: string;
  tags: string[];
  version: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  visits: number;
  publicOccupants: number;
  thumbnailImageUrl: string;
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
export type WebSocketNotification = Notification | FriendNotification;

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
  [key: string]: Favorite[];
};
export type MappedFavoritesToType = Record<FavoriteType, MappedFavoritesToGroup>;

export const FriendFavoriteGroups = ['group_0', 'group_1', 'group_2'] as const;
export type FriendFavoriteGroup = typeof FriendFavoriteGroups[number];
export type FavoriteType = 'world' | 'friend' | 'avatar';

export type Favorite = {
  type: FavoriteType;
  id: string;
  favoriteId: string;
  tags: FriendFavoriteGroup[];
};

export type NamedFavorite = Favorite & {
  groupName: string;
};

export type AddFavorite = Omit<Favorite, 'id'>;
