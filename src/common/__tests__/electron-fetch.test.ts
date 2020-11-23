import { waitFor } from '@testing-library/dom';
import { IpcRenderer } from 'electron';
import { electronFetch, IWindow, RequestConfig } from '../electron-fetch';

describe('electronFetch function', () => {
  const invoke = jest.fn();
  const iWindow: IWindow = (global.window as unknown) as IWindow;
  iWindow.ipcRenderer = ({
    invoke,
  } as unknown) as IpcRenderer;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('invokes ipcRenderer', async () => {
    invoke.mockReturnValueOnce(
      new Promise((resolve) => {
        resolve({
          type: 'entity',
          headers: {},
          result: {},
        });
      }),
    );

    const config: RequestConfig = {
      url: 'test',
    };
    const result = await electronFetch(config);
    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith('fetch', { url: 'test' });
    });
    expect(result).toEqual({
      type: 'entity',
      cookies: [],
      result: {},
    });
  });

  it('invokes ipcRenderer and returns cookies', async () => {
    invoke.mockReturnValueOnce(
      new Promise((resolve) => {
        resolve({
          type: 'entity',
          headers: {
            'set-cookie': ['testCookie=testCookie; Path=/'],
          },
          result: {},
        });
      }),
    );

    const config: RequestConfig = {
      url: 'test',
    };
    const result = await electronFetch(config);
    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith('fetch', { url: 'test' });
    });
    expect(result).toEqual({
      type: 'entity',
      cookies: [{ key: 'testCookie', value: 'testCookie=testCookie; Path=/', url: 'https://api.vrchat.cloud' }],
      result: {},
    });
  });

  it('invokes ipcRenderer and returns error', async () => {
    invoke.mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error('test error'));
      }),
    );

    const config: RequestConfig = {
      url: 'test',
    };
    const result = await electronFetch(config);
    await waitFor(() => {
      expect(invoke).toHaveBeenCalledWith('fetch', { url: 'test' });
    });
    expect(result).toEqual({
      type: 'error',
      message: 'test error',
    });
  });
});
