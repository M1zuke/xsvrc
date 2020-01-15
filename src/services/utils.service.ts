export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE';
  headers?: { [key: string]: string };
  body?: string;
  params?: RequestParams[]
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
  return electron.ipcRenderer.invoke('fetch', config);
};

