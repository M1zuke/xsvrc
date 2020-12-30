import pretty from 'pretty';
import React from 'react';
import { ElectronResult } from '../../../common/electron-controls';
import * as ElectronFetchModule from '../../../common/electron-controls';
import { routes } from '../../../common/routes';
import { AuthenticatedUserInfo } from '../../../store/user/state';
import { render, withAuthentication } from '../../../test-utils';
import USER_INFO_FETCH_RESULTS from '../../app/__tests__/user-info-fetch-results.json';
import { Login } from '../login/Login';

jest.mock('../../../common/electron-fetch');
const { electronFetch: FetchMock } = ElectronFetchModule as jest.Mocked<typeof ElectronFetchModule>;

describe('<Login /> Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders Login correctly', () => {
    const customResult = render(<Login />);
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('tries to login if authenticated', () => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<AuthenticatedUserInfo>>((resolve) => {
        resolve({
          type: 'entity',
          cookies: [],
          result: USER_INFO_FETCH_RESULTS as AuthenticatedUserInfo,
        });
      }),
    );

    const customResult = render(<Login />, { state: withAuthentication() });
    expect(customResult.history.location.pathname).toEqual(routes.home.path);
  });
});
