import { RootState } from '../rootReducer';

export const selectAvatarId = (state: RootState) => state.avatar.avatarId;
export const selectAvatarInfo = (state: RootState) => state.avatar.avatarInfo;
