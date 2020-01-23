import { combineReducers } from 'redux';
import { userReducer, UserState } from './user/reducer';
import { apiConfigReducer, ApiConfigState } from './apiConfig/reducers';
import { avatarReducer, AvatarState } from './avatar/reducer';

export interface RootState {
  user: UserState;
  apiConfig: ApiConfigState;
  avatar: AvatarState;
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  apiConfig: apiConfigReducer,
  avatar: avatarReducer,
});

export default rootReducer;
