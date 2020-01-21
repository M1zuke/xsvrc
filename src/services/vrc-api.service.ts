import { electronFetch, RequestConfig } from './utils.service';
import { store } from '../store/store';


export const apiFetch = <T>(config: RequestConfig): Promise<T> => {
  config = ensureApiKey({...config});
  return electronFetch<T>(config);
};

export const ensureApiKey = (config: RequestConfig): RequestConfig => {
  const apiKey = store.getState().apiConfig.apiKey;
  if (apiKey) {
    if (!config.params) {
      config.params = [];
    }
    config.params.push({key: 'apiKey', value: apiKey});
  }
  return config;
};

export const loginUser = (username: string, password: string): Promise<UserInfo> => {
  return apiFetch<UserInfo>({
    url: 'https://api.vrchat.cloud/api/1/auth/user',
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    },
  });

};

