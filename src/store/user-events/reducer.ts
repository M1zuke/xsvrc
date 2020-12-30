import { UserEventState, INITIAL_USER_EVENT_STATE } from './state';
import { UserEventActions } from './types';

export function reducer(state: UserEventState = INITIAL_USER_EVENT_STATE, action: UserEventActions): UserEventState {
  switch (action.type) {
    case 'user-event/add-event': {
      return {
        ...state,
        userEvents: [action.userEvent, ...state.userEvents],
      };
    }
    case 'user-event/save-world-info': {
      return {
        ...state,
        worlds: {
          ...state.worlds,
          [action.id]: action.worldInfo,
        },
      };
    }
  }
  return state;
}
