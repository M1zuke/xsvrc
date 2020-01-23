import { AvatarActionTypes, UPDATE_AVATAR_INFO, UpdateAvatarInfoAction } from './types';
import { isAction } from '../../costumTypes/typeUtils';

export interface AvatarState {
  avatarId: string;
  avatarInfo: AvatarInfo;
}

const initialState: AvatarState = {
  avatarId: '',
  avatarInfo: {},
};

export function avatarReducer(state: AvatarState = initialState, action: AvatarActionTypes): AvatarState {
  if (isAction<UpdateAvatarInfoAction>(action, UPDATE_AVATAR_INFO)) {
    return { ...state, avatarId: action.payload.id!, avatarInfo: { ...action.payload } };
  }

  return state;
}
