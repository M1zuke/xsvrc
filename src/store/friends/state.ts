import { Loadable } from '../reducer';

type DeveloperType = 'none';
type FriendStatus = 'ask me' | 'active' | 'join me' | 'busy';
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
  status: FriendStatus;
  location: string;
  statusDescription: string;
  tags: string[];
  userIcon: string;
  username: string;
};

export type FriendInfoState = Loadable<FriendInfo[]>;

export const INITIAL_FRIEND_INFO_STATE: FriendInfoState = null;
