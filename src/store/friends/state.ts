import { TrustTag } from '../../common/trust-system';
import { Loadable } from '../reducer';
import { VRCState, VRCUserStatus } from '../user/state';

type DeveloperType = 'none';
export type FriendInfo = {
  bio: string;
  currentAvatarImageUrl: string;
  currentAvatarThumbnailImageUrl: string;
  developerType: DeveloperType;
  displayName: string;
  fallbackAvatar: string;
  friendKey: string;
  id: string;
  isFriend: boolean;
  last_login: string; // 2020-11-20T21:36:11.762Z
  last_platform: string;
  status: VRCUserStatus;
  location: string;
  statusDescription: string;
  tags: TrustTag[];
  userIcon: string;
  username: string;
};

export type UserInfo = {
  username: string;
  displayName: string;
  id: string;
  bio: string;
  bioLinks: string[];
  state: VRCState;
  status: VRCUserStatus;
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
  location: string;
  worldId: string;
  instanceId: string;
  userIcon: string;
};

export type FriendInfoState = {
  active: Loadable<FriendInfo[]>;
  offline: Loadable<FriendInfo[]>;
  cachedUsers: Record<string, Loadable<UserInfo>>;
};

export const INITIAL_FRIEND_INFO_STATE: FriendInfoState = {
  active: null,
  offline: null,
  cachedUsers: {},
};
