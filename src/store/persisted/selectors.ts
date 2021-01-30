import { AppState } from '../index';
import { Settings, StoredCookie } from './state';

export const savedCookies = (state: AppState): StoredCookie[] => state.persisted.cookies;
export const selectSettings = (state: AppState): Settings => state.persisted.settings;
