import { combineReducers } from 'redux';
import { userReducer, UserState } from './user/reducer';
import { apiConfigReducer, ApiConfigState } from './apiConfig/reducers';

export interface RootState {
  user: UserState;
  apiConfig: ApiConfigState;
}

const rootReducer = combineReducers({
  user: userReducer,
  apiConfig: apiConfigReducer
});

export default rootReducer;
