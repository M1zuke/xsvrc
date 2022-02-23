import { getUser } from '../../api/getUser';
import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { AppState } from '../../store';
import { selectFriendInfoById } from '../../store/friends/selectors';
import { AppDispatch } from '../../thunk';
import { defaultUserInfo } from '../friend-overview/FriendOverview';

export type Comparison<V> = {
  from: V;
  to: V;
};

export type UserComparison<K extends keyof UserInfo = keyof UserInfo> = Partial<{
  [P in K]: Comparison<UserInfo[P]>;
}>;

export function compareUsers(oldUser: UserInfo | null = null, newUser: UserInfo): UserComparison {
  if (oldUser === null) {
    return {};
  }
  return Object.assign(
    {},
    ...Object.keys(newUser).map((key) => {
      const k = key as keyof UserInfo;
      const v = oldUser[k];
      const nv = newUser[k];
      if (Array.isArray(v) && Array.isArray(nv)) {
        const arrayComparison = compareArray(v, nv);
        if (arrayComparison.added.length === 0 && arrayComparison.removed.length === 0) {
          return undefined;
        }
        return {
          [key]: {
            from: v,
            to: nv,
          },
        };
      }

      if (oldUser[k] !== undefined && oldUser[k] !== newUser[k]) {
        return {
          [key]: {
            from: oldUser[k],
            to: newUser[k],
          },
        };
      }
      return undefined;
    }),
  );
}

type ArrayComparison<T extends string> = {
  added: T[];
  removed: T[];
};

function compareArray<T extends string = string>(a: T[], b: T[]): ArrayComparison<T> {
  const differencesToA: T[] = [];
  b.forEach((v) => {
    if (!a.includes(v)) {
      differencesToA.push(v);
    }
  });

  const differencesToB: T[] = [];
  a.forEach((v) => {
    if (!b.includes(v)) {
      differencesToA.push(v);
    }
  });
  return { added: differencesToA, removed: differencesToB };
}

export async function getOldUser(
  getState: () => AppState,
  dispatch: AppDispatch,
  userId: string,
  suppressFetchingUser?: boolean,
): Promise<UserInfo | null> {
  const state = getState();
  if (isLoaded(state.friends.friendInfo)) {
    if (!suppressFetchingUser && !state.friends.friendInfo[userId]) {
      await dispatch(getUser(userId));
    }
    const newState = getState();
    return Promise.resolve(isLoaded(newState.friends.friendInfo) ? newState.friends.friendInfo[userId] || null : null);
  }
  return Promise.resolve(null);
}

export async function fetchNewUserInfo(
  userId: UserInfo['id'],
  getState: () => AppState,
  dispatch: AppDispatch,
): Promise<UserInfo> {
  await dispatch(getUser(userId));
  const state = getState();
  const newUserInfo = selectFriendInfoById(userId)(state);

  if (isLoaded(newUserInfo)) {
    return Promise.resolve(newUserInfo || defaultUserInfo);
  }
  return Promise.resolve(defaultUserInfo);
}
