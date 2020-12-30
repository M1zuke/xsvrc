import { PersistedState } from 'redux-persist/es/types';
import { Settings, StoredCookie } from '../persisted/state';

export function migrate(state: PersistedState, version: number): Promise<PersistedState> {
  console.log(state, version);
  return Promise.resolve(state);
}

type Cookies = {
  cookies: StoredCookie[];
};

type RootState<T> = {
  persisted: Cookies & T;
};

type PersistedRootStateV1 = {
  cookies: StoredCookie[];
};
type PersistedRootStateV2 = RootState<{
  settings: Pick<Settings, 'localization' | 'use12hours'>;
}>;

export const migrations = {
  1: (state: PersistedRootStateV1): PersistedRootStateV2 => {
    return {
      persisted: {
        cookies: state.cookies,
        settings: { localization: 'en-EN', use12hours: true },
      },
    };
  },
};
