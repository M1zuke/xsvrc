import { UPDATE_AVATAR_INFO, UpdateAvatarInfoAction } from './types';

export function updateAvatarInfo(avatarInfo: AvatarInfo): UpdateAvatarInfoAction {
  return {
    type: UPDATE_AVATAR_INFO,
    payload: avatarInfo,
  };
}
