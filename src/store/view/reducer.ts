import { INITIAL_VIEW_STATE, ViewState } from './state';
import { ViewActions } from './types';

export function reducer(state: ViewState = INITIAL_VIEW_STATE, action: ViewActions): ViewState {
  switch (action.type) {
    case 'view/update-available': {
      return { ...state, updateAvailable: true };
    }
  }
  return state;
}
