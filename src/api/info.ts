import { setApiInfo } from '../store/api-info/actions';
import { VRCApiInfo } from '../store/api-info/state';
import { isErrorType } from '../store/reducer';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function info(): AppThunkAction {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.apiInfo === null || isErrorType(state.apiInfo)) {
      dispatch(setApiInfo('loading'));
    }

    const result = await prepare<VRCApiInfo>(state, dispatch, {
      url: api('config'),
    });

    if (result.type === 'entity') {
      dispatch(setApiInfo(result.result));
    }
  };
}
