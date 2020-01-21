import { RootState } from '../rootReducer';

export const selectLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectDisplayName = (state: RootState) => state.user.userInfo.displayName;
