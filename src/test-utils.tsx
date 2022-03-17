import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { createMemoryHistory, Location, MemoryHistory } from 'history';
import merge from 'lodash.merge';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Route, RouteProps, Router } from 'react-router-dom';
import { DeepPartial, Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './store';
import { AppAction, AppActions, AppActionsType } from './store/actions';
import { INITIAL_API_INFO_STATE } from './store/api-info/state';
import { INITIAL_FRIEND_INFO_STATE } from './store/friends/state';
import { INITIAL_HISTORY_STATE } from './store/history/state';
import { INITIAL_PERSISTED_STATE } from './store/persisted/state';
import { createAppStore } from './store/store';
import { INITIAL_USER_EVENT_STATE } from './store/user-events/state';
import { INITIAL_USER_STATE } from './store/user/state';
import { INITIAL_VIEW_STATE } from './store/view/state';
import { INITIAL_WORLD_STATE } from './store/worlds/state';

function Wrapper(
  props: React.PropsWithChildren<{
    store: Store;
    history: MemoryHistory;
    route: Pick<RouteProps, 'path'> & Partial<RouteProps>;
  }>,
): ReactElement {
  return (
    <Router history={props.history}>
      <Provider store={props.store}>
        <Route {...props.route}>{props.children}</Route>
      </Provider>
    </Router>
  );
}

export const INITIAL_TEST_APP_STATE: AppState = {
  persisted: INITIAL_PERSISTED_STATE,
  user: INITIAL_USER_STATE,
  view: INITIAL_VIEW_STATE,
  apiInfo: INITIAL_API_INFO_STATE,
  friends: INITIAL_FRIEND_INFO_STATE,
  userEvents: INITIAL_USER_EVENT_STATE,
  worlds: INITIAL_WORLD_STATE,
  history: INITIAL_HISTORY_STATE,
};

export function extendInitialState(state: DeepPartial<AppState>): AppState {
  return merge({}, INITIAL_TEST_APP_STATE, state);
}

export function createTestStore(state?: DeepPartial<AppState>): TestStore {
  return createAppStore(extendInitialState(state || {})) as TestStore;
}

export type LocationOverrides<S = Record<string, unknown>> =
  | DeepPartial<Omit<Location, 'state'>>
  | (DeepPartial<Omit<Location, 'state'>> & { state: S });

interface CustomRenderSettings<S> {
  options?: Omit<RenderOptions, 'wrapper'>;
  state?: DeepPartial<AppState>;
  location?: LocationOverrides<S>;
  route?: Partial<RouteProps>;
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: never) => never ? K : never }[keyof T];
type SpyObject<T, F extends FunctionPropertyNames<T>> = Pick<T, Exclude<keyof T, F>> & {
  [P in F]: T[P] &
    jest.SpyInstance<
      ReturnType<T[P] extends (...args: never) => never ? T[P] : never>,
      Parameters<T[P] extends (...args: never) => never ? T[P] : never>
    >;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type HistorySpy = SpyObject<MemoryHistory<Record<string, unknown>>, 'push' | 'replace' | 'goBack'>;

export type TestStore = Store<AppState, AppActions> & {
  dispatch: ThunkDispatch<AppState, undefined, AppAction<AppActionsType>>;
};

export interface CustomRenderResult {
  result: RenderResult;
  store: TestStore;
  history: HistorySpy;
}

const initialLocation: Location<Record<string, unknown>> = {
  pathname: '/',
  search: '',
  state: {},
  hash: 'x122c123',
  key: '123',
};

// export function withAuthentication(state?: DeepPartial<AppState>): DeepPartial<AppState> {
//   return merge({}, state || {}, {
//     apiInfo: { clientApiKey: 'testApiKey' },
//     cookies: [{ key: 'auth', value: 'testAuthToken', url: 'testUrl' }],
//     userInfo: USER_INFO_FETCH_RESULT as AuthenticatedUserInfo,
//   });
// }

export function spyObject<T, F extends FunctionPropertyNames<T>>(object: T, functions: F[]): SpyObject<T, F> {
  Object.keys(object).forEach((prop) => {
    const field = prop as F;
    if (functions.includes(field)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jest.spyOn(object, field);
    }
  });

  return object as unknown as SpyObject<T, F>;
}

export function createTestHistory<S>(location?: LocationOverrides<S>): HistorySpy {
  const $location = merge({}, initialLocation, location) as Location<S>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const history = spyObject(createMemoryHistory(), ['push', 'replace', 'goBack']);
  history.replace($location); // move into test code?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return history;
}

const defaultRoute: Pick<RouteProps, 'path'> = {
  path: '/',
};

function customRender<S = null>(ui: React.ReactElement, settings?: CustomRenderSettings<S>): CustomRenderResult {
  const store = createTestStore(settings?.state);
  const location = merge({}, initialLocation, settings?.location) as Location<S>;
  const history = createTestHistory<S>(location);

  const route = merge({}, defaultRoute, settings?.route);
  return {
    result: render(
      <Wrapper history={history} store={store} route={route}>
        {ui}
      </Wrapper>,
      settings?.options,
    ),
    store: store,
    history: history,
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
