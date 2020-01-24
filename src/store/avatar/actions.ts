import { SET_AVATAR_FETCHING, SET_AVATAR_NOT_FOUND_ERROR, SetAvatarNotFoundErrorAction, UPDATE_AVATAR_INFO, UpdateAvatarInfoAction } from './types';

export function updateAvatarInfo(avatarInfo: AvatarInfo): UpdateAvatarInfoAction {
  return {
    type: UPDATE_AVATAR_INFO,
    payload: avatarInfo,
  };
}

export function setAvatarNotFoundError(avatarId: string): SetAvatarNotFoundErrorAction {
  return {
    type: SET_AVATAR_NOT_FOUND_ERROR,
    payload: avatarId,
  };
}

export function setAvatarFetching() {
  return {
    type: SET_AVATAR_FETCHING,
  };
}
