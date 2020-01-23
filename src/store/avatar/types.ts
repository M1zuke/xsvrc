export const UPDATE_AVATAR_INFO: string = 'UPDATE_AVATR_INFO';

export interface UpdateAvatarInfoAction {
  type: typeof UPDATE_AVATAR_INFO;
  payload: AvatarInfo;
}

export type AvatarActionTypes =
    | UpdateAvatarInfoAction;
