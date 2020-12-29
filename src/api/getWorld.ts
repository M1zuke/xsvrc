import { saveWorldInfo } from '../store/user-events/action';
import { selectWorldByLocation } from '../store/user-events/selectors';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { WorldInfo } from './types';

export function getWorld(location: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const [worldId] = location.split(':');

    const state = getState();
    const worldInfo = selectWorldByLocation(location)(state);

    if (worldInfo === null) {
      const response = await prepare<WorldInfo>(state, dispatch, {
        url: api(`worlds/${worldId}`),
      });

      if (response.type === 'entity') {
        dispatch(saveWorldInfo(response.result));
      }
    }
  };
}
