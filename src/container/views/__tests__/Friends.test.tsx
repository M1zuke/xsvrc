import { waitFor } from '@testing-library/dom';
import pretty from 'pretty';
import React from 'react';
import { api } from '../../../api/prepare';
import * as ElectronFetchModule from '../../../common/electron-fetch';
import { ElectronResult } from '../../../common/electron-fetch';
import { AuthenticatedUserInfo } from '../../../store/user/state';
import { render, withAuthentication } from '../../../test-utils';
import { Friends } from '../friends/Friends';
import USER_INFO_FETCH_RESULTS from '../../app/__tests__/user-info-fetch-results.json';

jest.mock('../../../common/electron-fetch');
const { electronFetch: FetchMock } = ElectronFetchModule as jest.Mocked<typeof ElectronFetchModule>;

describe('<Friends /> Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches friends', async () => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<AuthenticatedUserInfo>>((resolve) => {
        resolve({
          type: 'entity',
          cookies: [],
          result: USER_INFO_FETCH_RESULTS as AuthenticatedUserInfo,
        });
      }),
    );

    const customResult = render(<Friends />, {
      state: withAuthentication({
        friends: 'loading',
      }),
    });

    await waitFor(() => {
      expect(FetchMock).toHaveBeenCalledWith({
        params: [
          { key: 'offline', value: 'false' },
          { key: 'apiKey', value: 'testApiKey' },
        ],
        storedCookies: [{ key: 'auth', url: 'testUrl', value: 'testAuthToken' }],
        url: api('auth/user/friends'),
      });
    });

    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
    expect(customResult.store.getState().friends).toEqual(USER_INFO_FETCH_RESULTS);
  });

  it('receives an error', async () => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<AuthenticatedUserInfo>>((resolve) => {
        resolve({
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          type: 'error',
          message: '123',
        });
      }),
    );

    const customResult = render(<Friends />, { state: withAuthentication() });

    await waitFor(() => {
      expect(FetchMock).toHaveBeenCalled();
    });

    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
    expect(customResult.store.getState().cookies).toEqual([]);
  });
});
