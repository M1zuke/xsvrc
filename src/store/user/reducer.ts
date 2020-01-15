import { LOG_IN, LOG_OUT, LogInAction, LogOutAction, UPDATE_USER_INFO, UpdateUserInfoAction, UserActionTypes } from './types';
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
    return {...state, loggedIn: true, userInfo: {...action.payload.userInfo}};
  }

  if (isAction<LogOutAction>(action, LOG_OUT)) {
    return initialState;
  }

  if (isAction<UpdateUserInfoAction>(action, UPDATE_USER_INFO)) {
    return {...state, userInfo: {...state.userInfo, ...action.payload}};
  }

  return state;
}
