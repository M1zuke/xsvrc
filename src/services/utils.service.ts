import { sortBy } from 'lodash';
import { store } from '../store/store';
import { setStoredCookies } from '../store/user/actions';
import { StoredCookie } from '../store/user/reducer';

export const specialCharRegExp = new RegExp(/\P{L}/gu);

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE';
  headers?: { [key: string]: string };
  body?: string;
  params?: RequestParams[];
  storedCookies?: StoredCookie[];
}

export interface RequestParams {
  key: string;
  value: string;
}

export const electronFetch = <T>(config: RequestConfig): Promise<T> => {
  const electron = window.require('electron');

  if (config.params) {
    const url: URL = new URL(config.url);

    config.params.forEach((param) => {
      url.searchParams.set(param.key, param.value);
    });

    config.url = url.href;
  }

  if (!config.method) {
    config.method = 'GET';
  }
  return electron.ipcRenderer.invoke('fetch', config).then((result: any) => {
    console.log('headers', result.headers);
    if (result.headers['set-cookie']) {
      const storedCookies: StoredCookie[] = [];
      result.headers['set-cookie'].forEach((cookie: string) => {
        storedCookies.push({
          key: cookie.match(/\w*/g)![0],
          value: cookie,
          url: 'https://api.vrchat.cloud',
        });
      });
      store.dispatch(setStoredCookies(storedCookies));
      console.log('set-cookies', storedCookies);
      //const headers = result.headers['set-cookies'];
      // console.log(headers);
    }
    return JSON.parse(result.body);
  })
  .catch((e: Error) => Promise.reject(e));
};

const normalChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function containsNormalChar(char: string): boolean {
  return normalChars.indexOf(char.toUpperCase()) !== -1;
}

export function sort<T>(object: T[], propertyToSort: keyof T): T[] {

  const specialCharacters: T[] = object.filter((item) => {
    const value = item[propertyToSort];
    if (typeof value !== 'string') {
      return false;
    }
    return !containsNormalChar(value[0]);
  });
  const nonSpecialCharacters: T[] = object.filter((item: T) => {
    const value: unknown = item[propertyToSort];
    if (typeof value !== 'string') {
      return false;
    }
    return containsNormalChar(value[0]);
  });
  const sortedSpecialChars: T[] = sortBy(specialCharacters, propertyToSort);
  const sortedNormalChars: T[] = sortBy(nonSpecialCharacters, propertyToSort);
  sortedNormalChars.unshift(...sortedSpecialChars);
  return sortedNormalChars;
}

export function containsBeginningChar(char: string, list: string[]): boolean {
  return !!list.find((i) => containsChar(char, i[0]));
}

export function containsChar(char: string, characters: string): boolean {
  if (char === '#') {
    return !containsNormalChar(characters);
  }
  return characters.toUpperCase() === char.toUpperCase();
}
