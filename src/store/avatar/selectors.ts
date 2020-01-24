import { RootState } from '../rootReducer';

export const selectAvatarState = (state: RootState) => state.avatar;
export const selectAvatarInfo = (state: RootState) => state.avatar.avatarInfo;
