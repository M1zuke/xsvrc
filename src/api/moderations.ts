import { setModerations } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { Moderation } from './types';

export function getAllModerations(): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.user.moderations === null) {
      dispatch(setModerations('loading'));
    }
    const result = await prepare<Moderation[]>(getState, dispatch, {
      url: api('auth/user/playermoderations'),
    });

    if (result.type === 'entity') {
      dispatch(setModerations(result.result));
    }
  };
}
