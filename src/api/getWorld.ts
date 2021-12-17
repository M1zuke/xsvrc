import { setInstanceInfo, setWorldInfo } from '../store/worlds/actions';
import { selectInstanceByInstance, selectWorldByLocation } from '../store/worlds/selectors';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { InstanceInfo, WorldInfo } from './types';

export function getWorld(location: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    if (location !== 'private' && location !== 'offline' && location !== '') {
      const [worldId] = location.split(':');

      const state = getState();
      const worldInfo = selectWorldByLocation(location)(state);

      if (!worldId) {
        return;
      }

      if (worldInfo === null) {
        setWorldInfo(worldId, 'loading');
        const response = await prepare<WorldInfo>(state, dispatch, {
          url: api(`worlds/${worldId}`),
        });

        if (response.type === 'entity') {
          dispatch(setWorldInfo(worldId, response.result));
        } else {
          dispatch(setWorldInfo(worldId, 'not-found'));
        }
      }
    }
  };
}

export function getInstance(location: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const [worldId, instanceId] = location.split(':');

    const state = getState();
    const instanceInfo = selectInstanceByInstance(location)(state);

    if (!worldId || !instanceId) {
      return;
    }

    if (instanceInfo === null) {
      setInstanceInfo(location, 'loading');
    }
    const response = await prepare<InstanceInfo>(state, dispatch, {
      url: api(`worlds/${worldId}/${instanceId}`),
    });

    if (response.type === 'entity') {
      dispatch(setInstanceInfo(location, response.result));
    } else {
      dispatch(setInstanceInfo(location, 'not-found'));
    }
  };
}
