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
  last_login: string;
  last_platform: string;
  allowAvatarCopying: boolean;
  tags: TrustTag[];
  developerType: DeveloperType;
  isFriend: boolean;
  friendKey: string;
  location: Location;
  worldId: string;
  instanceId: string;
  userIcon: string;
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

type FriendUpdateWithUser = {
  type: 'friend-active' | 'friend-add' | 'friend-update';
  content: {
    userId: string;
    user: UserInfo;
  };
};

type FriendUpdatesUserId = {
  type: 'friend-offline' | 'friend-delete';
  content: {
    userId: string;
  };
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

type FriendLocationUpdate = {
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
  worldId: string;
};

type RequestInviteNotification = {
  type: 'requestInvite';
  platform: string;
};

type VoteToKickNotification = {
  type: 'votetokick';
  userToKickId: string;
  initiatorUserId: string;
};

type FriendRequestNotificationDetails = {
  type: 'friendRequest';
};

type NotificationDetails =
  | InviteNotification
  | RequestInviteNotification
  | VoteToKickNotification
  | FriendRequestNotificationDetails;

export type NotificationDTO = NotificationDetails & {
  id: string;
  senderUsername: string;
  senderUserId: string;
  message: string;
  seen: boolean;
  created_at: string;
};

export type Notification = {
  type: 'notification';
  content: NotificationDTO;
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

export type RawWebsocketNotification = {
  type: WebSocketNotification['type'];
  content: string;
};
