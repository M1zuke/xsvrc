import { RootState } from '../rootReducer';

export const selectLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectDisplayName = (state: RootState) => state.user.userInfo.displayName;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectAvatarThumbnailImageUrl = (state: RootState) => state.user.userInfo.currentAvatarThumbnailImageUrl;
export const selectCurrentAvatar = (state: RootState) => state.user.userInfo.currentAvatar;
export const selectStoredCookies = (state: RootState) => state.user.storedCookies;
