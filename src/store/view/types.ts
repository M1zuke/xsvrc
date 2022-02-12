import { Action } from 'redux';
import { Messages } from '../../i18n/Messages';
import { ModalConfig } from './state';

export type ViewActionTypes = `view/${'update-available' | 'set-i18n' | 'set-modal'}`;

export type ViewAction<T extends ViewActionTypes> = Action<T>;

export type UpdateAvailable = ViewAction<'view/update-available'>;
export type SetI18N = ViewAction<'view/set-i18n'> & {
  i18n: Messages;
};
export type SetModal = ViewAction<'view/set-modal'> & {
  modal: ModalConfig;
};

export type ViewActions = UpdateAvailable | SetI18N | SetModal;
