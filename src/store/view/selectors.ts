import { AppState } from '../index';

export const IsUpdateAvailable = (state: AppState): boolean => state.view.updateAvailable;
