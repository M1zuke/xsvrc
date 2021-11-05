import { SettingsState, StoredCookie } from './state';
import { ResetUserCookies, SetSettings, SetUserCookies } from './types';

export function setStoredCookies(cookies: StoredCookie[]): SetUserCookies {
  return {
    type: 'cookie/set-cookies',
    cookies: cookies,
  };
}

export function setSettings(settings: Partial<SettingsState>): SetSettings {
  return {
    type: 'settings/setSettings',
    settings,
  };
}

export function resetStoredCookies(): ResetUserCookies {
  return {
    type: 'cookie/reset-cookies',
  };
}
