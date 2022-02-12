import { messages as de } from '../../i18n/de';
import { messages as en } from '../../i18n/en';
import { Localization } from '../persisted/state';
import { ModalConfig } from './state';
import { SetI18N, SetModal, UpdateAvailable } from './types';

export function updateAvailable(): UpdateAvailable {
  return {
    type: 'view/update-available',
  };
}

export function setI18N(i18n: Localization): SetI18N {
  const messages = i18n === 'en-EN' ? en : de;
  return {
    type: 'view/set-i18n',
    i18n: messages,
  };
}

export function setModal(modal: ModalConfig): SetModal {
  return {
    type: 'view/set-modal',
    modal,
  };
}
