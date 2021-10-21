import { IpcRenderer } from 'electron';
import { RemoteTransport } from 'electron-log';
import { StoredCookie } from '../store/persisted/state';

export interface RequestParams {
  key: string;
  value: string | number;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  headers?: { [key: string]: string };
  body?: unknown;
  params?: RequestParams[];
  storedCookies?: StoredCookie[];
}

export type IWindow = Window & {
  ipcRenderer: IpcRenderer;
  remote: RemoteTransport;
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
    const result: RequestType<T> = await (window as unknown as IWindow).ipcRenderer.invoke('fetch', config);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setCookies: string[] = result.headers['set-cookie'] || [];
    const storedCookies: StoredCookie[] = [];

    setCookies.forEach((cookie: string) => {
      const equalIndex = cookie.indexOf('=');
      const semiIndex = cookie.indexOf(';');

      const key = cookie.slice(0, equalIndex);
      const value = cookie.slice(equalIndex + 1, semiIndex);

      /* istanbul ignore else: Can't Happen */
      if (key && value) {
        storedCookies.push({
          key: key,
          value: cookie,
          url: 'https://api.vrchat.cloud',
          cleanValue: value,
        });
      }
    });
    return {
      type: 'entity',
      cookies: storedCookies,
      result: result.result,
    } as ElectronResult<T>;
  } catch (error) {
    return { type: 'error', message: (error as Error).message } as ErrorType;
  }
}

export function useIpcRenderer(): IpcRenderer {
  return (window as unknown as IWindow).ipcRenderer;
}
