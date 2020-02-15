import { store } from '../store/store';
import { setStoredCookies } from '../store/user/actions';
import { StoredCookie } from '../store/user/reducer';

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

export function containsBeginningChar(char: string, list: string[]): boolean {
  return !!list.find((i) => containsChar(char, i[0]));
}

export function containsChar(char: string, characters: string): boolean {
  const specialChars = new RegExp(/[^a-z]/gi);
  if (char === '#') {
    return specialChars.test(characters);
  }
  return characters.toUpperCase() === char.toUpperCase();
}
