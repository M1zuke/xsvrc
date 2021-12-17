import { electronFetch, ElectronResult, ErrorType, RequestConfig } from '../common/electron-controls';
import { AppState } from '../store';
import { resetStoredCookies, setStoredCookies } from '../store/persisted/actions';
import { isErrorType, Loadable } from '../store/reducer';
import { AppDispatch } from '../thunk';

export type FetchResult<T> = Omit<ElectronResult<T>, 'cookies'>;

export function api(path: string): string {
  return `https://api.vrchat.cloud/api/1/${path}`;
}

export function isLoaded<T>(object: Loadable<T>): object is T {
  return !(
    object === null ||
    object === undefined ||
    object === 'loading' ||
    object === 'not-found' ||
    isErrorType(object)
  );
}

function ensureApiKey(config: RequestConfig, key: string): RequestConfig {
  if (key) {
    if (!config.params) {
      config.params = [];
    }
    config.params.push({ key: 'apiKey', value: key });
  }
  return config;
}

export async function prepare<T>(
  state: (() => AppState) | AppState,
  dispatch: AppDispatch,
  config: RequestConfig,
): Promise<FetchResult<T> | ErrorType> {
  try {
    const $state = typeof state === 'function' ? state() : state;
    const apiKey = $state.apiInfo;
    const storedCookies = $state.persisted.cookies;

    if (isLoaded(apiKey)) {
      config = ensureApiKey(config, apiKey.clientApiKey);
    }

    const result = await electronFetch<T>({ ...config, storedCookies: storedCookies });

    if (result.type === 'entity') {
      if (result.cookies.length !== 0) {
        dispatch(setStoredCookies(result.cookies));
      }
      return Promise.resolve({
        result: result.result,
        type: 'entity',
      });
    }
    if (result.type === 'error' && result.error.statusCode === 401) {
      dispatch(resetStoredCookies());
    }

    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve({ type: 'code-error', error: error as Error });
  }
}
