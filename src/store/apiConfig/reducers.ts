import { ApiConfigActionTypes, UPDATE_API_CONFIG, UpdateApiConfigAction } from './types';
import { isAction } from '../../costumTypes/typeUtils';

export type ApiConfigState = ApiConfig;

const initialState: ApiConfigState = {
  apiKey: '',
};

export function apiConfigReducer(state: ApiConfigState = initialState, action: ApiConfigActionTypes): ApiConfigState {
  if (isAction<UpdateApiConfigAction>(action, UPDATE_API_CONFIG)) {
    return { ...action.payload };
  }

  return state;
}
