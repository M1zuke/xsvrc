import { IpcRenderer } from 'electron';
import { StoredCookie } from '../store/cookies/state';

export interface RequestParams {
  key: string;
  value: string | number;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE';
  headers?: { [key: string]: string };
  body?: string;
  params?: RequestParams[];
  storedCookies?: StoredCookie[];
}

export type IWindow = Window & {
  ipcRenderer: IpcRenderer;
};

type RequestType<T> = {
  type: 'entity';
  headers: { [key: string]: string | string[] };
  result: T;
};

export type ElectronResult<T> = {
  type: 'entity';
  result: T;
  cookies: StoredCookie[];
};

export type ErrorType = {
  type: 'error';
  message: string;
};

export async function electronFetch<T>(config: RequestConfig): Promise<ElectronResult<T> | ErrorType> {
  try {
    const result: RequestType<T> = await ((window as unknown) as IWindow).ipcRenderer.invoke('fetch', config);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const setCookies: string[] = result.headers['set-cookie'] || [];
    const storedCookies: StoredCookie[] = [];

    setCookies.forEach((cookie: string) => {
      const key = cookie.match(/\w*/g);
      /* istanbul ignore else: Can't Happen */
      if (key && key[0]) {
        storedCookies.push({
          key: key[0],
          value: cookie,
          url: 'https://api.vrchat.cloud',
        });
      }
    });
    return {
      type: 'entity',
      cookies: storedCookies,
      result: result.result,
    } as ElectronResult<T>;
  } catch (error) {
    return { type: 'error', message: error.message } as ErrorType;
  }
}
