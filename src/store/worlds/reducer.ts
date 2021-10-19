import { INITIAL_WORLD_STATE, WorldsState } from './state';
import { WorldsActions } from './types';

export function reducer(state: WorldsState = INITIAL_WORLD_STATE, action: WorldsActions): WorldsState {
  switch (action.type) {
    case 'worlds/set-instance-info':
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.location]: action.instanceInfo,
        },
      };
    case 'worlds/set-world-info':
      return {
        ...state,
        worlds: {
          ...state.worlds,
          [action.worldId]: action.worldInfo,
        },
      };
  }
  return state;
}
