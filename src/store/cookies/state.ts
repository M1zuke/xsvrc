export type StoredCookie = {
  key: string;
  value: string;
  url: string;
  cleanValue: string;
};

export type CookieState = StoredCookie[];

export const INITIAL_COOKIE_STATE: StoredCookie[] = [];
