import { messages as en } from '../../i18n/en';
import { Messages } from '../../i18n/Messages';

export type FriendProfile = {
  type: 'friend-profile';
  userId: string;
  edit?: boolean;
};

export type ModalConfig = FriendProfile | null;

export interface ViewState {
  i18n: Messages;
  updateAvailable: boolean;
  modal: ModalConfig;
  blocked: boolean;
}

export const INITIAL_VIEW_STATE: ViewState = {
  i18n: en,
  updateAvailable: false,
  modal: null,
  blocked: false,
};
