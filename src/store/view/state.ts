import { messages as en } from '../../i18n/en';
import { Messages } from '../../i18n/Messages';

export interface ViewState {
  i18n: Messages;
  updateAvailable: boolean;
}

export const INITIAL_VIEW_STATE: ViewState = {
  i18n: en,
  updateAvailable: false,
};
