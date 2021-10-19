import { INITIAL_USER_EVENT_STATE, UserEventState } from './state';
import { UserEventActions } from './types';

export function reducer(state: UserEventState = INITIAL_USER_EVENT_STATE, action: UserEventActions): UserEventState {
  switch (action.type) {
    case 'user-event/add-event': {
      return [{ ...action.userEvent, eventKey: state.length }, ...state];
    }
  }
  return state;
}
