import { messages as en } from '../../i18n/en';
import { Messages } from '../../i18n/Messages';

export type FriendProfile = {
  type: 'friend-profile';
  userId: string;
};

export type ModalConfig = FriendProfile | null;

export interface ViewState {
  i18n: Messages;
  updateAvailable: boolean;
  modal: ModalConfig;
}

export const INITIAL_VIEW_STATE: ViewState = {
  i18n: en,
  updateAvailable: false,
  modal: null,
};
