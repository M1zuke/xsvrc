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
  blockable?: boolean;
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

export type ErrorType = CodeError | ResponseError;

export type ResponseError = {
  type: 'error';
  error: CustomError;
};

export type CodeError = {
  type: 'code-error';
  error: Error;
};

type CustomError = {
  message: string;
  statusCode: number;
};

export async function electronFetch<T>(config: RequestConfig): Promise<ElectronResult<T> | ErrorType> {
  try {
    const result: RequestType<T> | ErrorType = await (window as unknown as IWindow).ipcRenderer.invoke('fetch', config);

    if (result.type === 'entity') {
      const setCookies: string[] = (result.headers['set-cookie'] || []) as string[];
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
      return Promise.resolve({
        type: 'entity',
        cookies: storedCookies,
        result: result.result,
      } as ElectronResult<T>);
    }
    return Promise.resolve({ type: 'error', error: result.error } as ErrorType);
  } catch (error) {
    return Promise.resolve({ type: 'code-error', error: error as Error });
  }
}

export function useIpcRenderer(): IpcRenderer {
  return (window as unknown as IWindow).ipcRenderer;
}
