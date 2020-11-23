import { AppInfoState, INITIAL_API_INFO_STATE } from './state';
import { ApiInfoActions } from './types';

export function reducer(state: AppInfoState = INITIAL_API_INFO_STATE, action: ApiInfoActions): AppInfoState {
  switch (action.type) {
    case 'api-info/set-vrc-api-info':
      return action.apiInfo;
  }
  return state;
}
