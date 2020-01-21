import { LOG_IN, LOG_OUT, LogInAction, LogOutAction, UserActionTypes } from './types';
import { isAction } from '../../costumTypes/typeUtils';

export interface UserState {
  loggedIn: boolean;
  userInfo: UserInfo;
}

const initialState: UserState = {
  loggedIn: false,
  userInfo: {},
};

export function userReducer(state: UserState = initialState, action: UserActionTypes): UserState {

  if (isAction<LogInAction>(action, LOG_IN)) {
    return { ...state, loggedIn: true, userInfo: { ...action.payload } };
  }

  if (isAction<LogOutAction>(action, LOG_OUT)) {
    return initialState;
  }

  return state;
}
