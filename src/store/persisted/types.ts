import { Action } from 'redux';
import { Settings, StoredCookie } from './state';

export type PersistedActionType = 'cookie/set-cookies' | 'cookie/reset-cookies' | 'settings/setSettings';

export type PersistedAction<T extends PersistedActionType> = Action<T>;

export type SetUserCookies = PersistedAction<'cookie/set-cookies'> & {
  cookies: StoredCookie[];
};

export type SetSettings = PersistedAction<'settings/setSettings'> & {
  settings: Partial<Settings>;
};
export type ResetUserCookies = PersistedAction<'cookie/reset-cookies'>;

export type PersistedActions = SetUserCookies | ResetUserCookies | SetSettings;
