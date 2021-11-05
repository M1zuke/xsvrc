import { AppState } from '../index';
import { SettingsState, StoredCookie } from './state';

export const savedCookies = (state: AppState): StoredCookie[] => state.persisted.cookies;
export const selectSettings = (state: AppState): SettingsState => state.persisted.settings;
