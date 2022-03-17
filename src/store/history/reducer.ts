import { HistoryState, INITIAL_HISTORY_STATE } from './state';
import { HistoryActions } from './types';

export function reducer(state: HistoryState = INITIAL_HISTORY_STATE, actions: HistoryActions): HistoryState {
  switch (actions.type) {
    case 'history/add-history': {
      const oldEntries = state[actions.userId];
      if (oldEntries) {
        return {
          ...state,
          [actions.userId]: [actions.newLocation, ...state[actions.userId]],
        };
      }
      return {
        ...state,
        [actions.userId]: [actions.oldLocation],
      };
    }
  }
  return state;
}
