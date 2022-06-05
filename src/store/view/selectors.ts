import { AppState } from '../index';
import { ModalConfig } from './state';

export const IsUpdateAvailable = (state: AppState): boolean => state.view.updateAvailable;
export const GetModal = (state: AppState): ModalConfig => state.view.modal;
export const GetBlocked = (state: AppState): boolean => state.view.blocked;
