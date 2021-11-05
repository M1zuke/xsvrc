export type StoredCookie = {
  key: string;
  value: string;
  url: string;
  cleanValue: string;
};

export type SettingsState = {
  localization: Localization;
  use12hours: boolean;
};

export type PersistedState = {
  settings: SettingsState;
  cookies: StoredCookie[];
};

export const INITIAL_SETTINGS_STATE: SettingsState = {
  localization: 'en-EN',
  use12hours: true,
};

export const INITIAL_PERSISTED_STATE: PersistedState = {
  cookies: [],
  settings: INITIAL_SETTINGS_STATE,
};

export const Localizations = ['en-EN', 'de-DE'] as const;
export type Localization = typeof Localizations[number];
