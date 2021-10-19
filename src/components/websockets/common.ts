import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { AppState } from '../../store';

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

export function getFriendsAndOldUser(state: AppState, userId: string): [UserInfo[], UserInfo | null] {
  if (isLoaded(state.friends.friendInfo)) {
    return [Object.values(state.friends.friendInfo), state.friends.friendInfo[userId] || null];
  }
  return [[], null];
}
