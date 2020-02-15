import { RootState } from '../rootReducer';

export const selectFriendInfo = (state: RootState) => state.friends.friendInfos;
export const selectFriendInfoFetched = (state: RootState) => state.friends.friendsFetched;
export const selectFriendInfoLastFetched = (state: RootState) => new Date(state.friends.lastFetched);
