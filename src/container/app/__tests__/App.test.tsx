import { waitFor } from '@testing-library/dom';
import pretty from 'pretty';
import React from 'react';
import * as ElectronFetchModule from '../../../common/electron-fetch';
import { ElectronResult } from '../../../common/electron-fetch';
import { routes } from '../../../common/routes';
import * as UserOverviewModule from '../../../components/user-overview/UserOverview';
import { VRCApiInfo } from '../../../store/api-info/state';
import { render, withAuthentication } from '../../../test-utils';
import App from '../App';
import * as FriendsModule from '../../views/friends/Friends';
import * as HomeModule from '../../views/home/Home';
import * as LoginModule from '../../views/login/Login';

const { electronFetch: FetchMock } = ElectronFetchModule as jest.Mocked<typeof ElectronFetchModule>;
const { Login: LoginMock } = LoginModule as jest.Mocked<typeof LoginModule>;
const { Home: HomeMock } = HomeModule as jest.Mocked<typeof HomeModule>;
const { Friends: FriendsMock } = FriendsModule as jest.Mocked<typeof FriendsModule>;
const { UserOverview: UserOverviewMock } = UserOverviewModule as jest.Mocked<typeof UserOverviewModule>;

jest.mock('../../../common/electron-fetch');
jest.mock('../../views/login/Login');
jest.mock('../../views/home/Home');
jest.mock('../../views/friends/Friends');
jest.mock('../../../components/user-overview/UserOverview');

describe('<App /> Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login Component', async () => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<VRCApiInfo>>((resolve) => {
        resolve({
          type: 'entity',
          cookies: [],
          result: { clientApiKey: 'testClientApiKey' },
        });
      }),
    );
    const customResult = render(<App />, {
      location: { pathname: routes.login.path },
      route: { path: routes.login.path },
    });

    await waitFor(() => {
      expect(LoginMock).toHaveBeenCalled();
    });

    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('fetches VRCApiInfo', async () => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<VRCApiInfo>>((resolve) => {
        resolve({
          type: 'entity',
          cookies: [],
          result: { clientApiKey: 'testClientApiKey' },
        });
      }),
    );
    const customResult = render(<App />, {
      location: { pathname: routes.login.path },
      route: { path: routes.login.path },
    });
    await waitFor(() => {
      expect(FetchMock).toHaveBeenCalledWith({
        storedCookies: [],
        url: 'https://api.vrchat.cloud/api/1/config',
      });
    });

    expect(customResult.store.getState().apiInfo).toEqual({
      clientApiKey: 'testClientApiKey',
    });
  });

  type mockedComponents = typeof HomeMock | typeof FriendsMock;
  const mappedMockComponentsToRoute: Record<string, { path: string; component: mockedComponents }> = {
    home: { component: HomeMock, path: routes.home.path },
    friends: { component: FriendsMock, path: routes.friends.path },
  };

  it.each(Object.values(mappedMockComponentsToRoute))('renders %s Component', async (info) => {
    FetchMock.mockReturnValueOnce(
      new Promise<ElectronResult<VRCApiInfo>>((resolve) => {
        resolve({
          type: 'entity',
          cookies: [],
          result: { clientApiKey: 'testClientApiKey' },
        });
      }),
    );
    const customResult = render(<App />, {
      location: { pathname: info.path },
      route: { path: info.path },
      state: withAuthentication(),
    });
    await waitFor(() => {
      expect(FetchMock).toHaveBeenCalledWith({
        params: [{ key: 'apiKey', value: 'testApiKey' }],
        storedCookies: [{ key: 'auth', url: 'testUrl', value: 'testAuthToken' }],
        url: 'https://api.vrchat.cloud/api/1/config',
      });
    });

    await waitFor(() => {
      expect(UserOverviewMock).toHaveBeenCalled();
      expect(info.component).toHaveBeenCalled();
    });

    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });
});
