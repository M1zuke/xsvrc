export const UPDATE_AVATAR_INFO: string = 'UPDATE_AVATAR_INFO';
export const SET_AVATAR_NOT_FOUND_ERROR: string = 'SET_AVATAR_NOT_FOUND_ERROR';
export const SET_AVATAR_FETCHING: string = 'SET_AVATAR_FETCHING';
export interface UpdateAvatarInfoAction {
  type: typeof UPDATE_AVATAR_INFO;
  payload: AvatarInfo;
}

export interface SetAvatarNotFoundErrorAction {
  type: typeof SET_AVATAR_NOT_FOUND_ERROR;
  payload: string;
}

export interface SetAvatarFetchingAction {
  type: typeof SET_AVATAR_FETCHING;
}

export type AvatarActionTypes =
  | UpdateAvatarInfoAction
  | SetAvatarNotFoundErrorAction;
