import { INITIAL_VIEW_STATE, ViewState } from './state';
import { ViewActions } from './types';

export function reducer(state: ViewState = INITIAL_VIEW_STATE, action: ViewActions): ViewState {
  switch (action.type) {
    case 'view/update-available': {
      return { ...state, updateAvailable: true };
    }
    case 'view/set-i18n': {
      return { ...state, i18n: action.i18n };
    }
  }
  return state;
}
