import { combineReducers } from 'redux';
import { apiConfigReducer, ApiConfigState } from './apiConfig/reducers';
import { avatarReducer, AvatarState } from './avatar/reducer';
import { FriendListState, friendReducer } from './friends/reducers';
import { userReducer, UserState } from './user/reducer';

export interface RootState {
  user: UserState;
  apiConfig: ApiConfigState;
  avatar: AvatarState;
  friends: FriendListState;
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  apiConfig: apiConfigReducer,
  avatar: avatarReducer,
  friends: friendReducer,
});

export default rootReducer;
