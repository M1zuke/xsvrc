import { ApiConfigState } from './reducers';
import { ApiConfigActionTypes, UPDATE_API_CONFIG } from './types';

export function updateApiConfig(newApiConfig: ApiConfigState): ApiConfigActionTypes {
  return {
    type: UPDATE_API_CONFIG,
    payload: newApiConfig,
  };
}
