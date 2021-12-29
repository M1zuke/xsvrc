import { setAvatars, updateAvatarInfo } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { AvatarInfo } from './types';

const limit = 100;

export function getAllAvatars(avatars: AvatarInfo[] = [], offset = 0): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.user.avatars === null) {
      dispatch(setAvatars('loading'));
    }

    const response = await prepare<AvatarInfo[]>(getState, dispatch, {
      url: api(`avatars`),
      params: [
        { key: 'user', value: 'me' },
        { key: 'sort', value: 'created' },
        { key: 'releaseStatus', value: 'all' },
        { key: 'order', value: 'descending' },
        { key: 'offset', value: offset },
        { key: 'n', value: limit },
      ],
    });

    if (response.type === 'entity') {
      const newAvatars = [...avatars, ...response.result];
      if (response.result.length > 0) {
        return dispatch(getAllAvatars(newAvatars, offset + limit));
      }
      dispatch(setAvatars(newAvatars));
    } else {
      console.error(response.error);
    }
  };
}

export function getAvatar(avatarId: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const response = await prepare<AvatarInfo>(getState, dispatch, {
      url: api(`avatars/${avatarId}`),
    });

    if (response.type === 'entity') {
      dispatch(updateAvatarInfo(response.result));
    } else {
      console.error(response.error);
    }
  };
}

export function updateAvatar(avatarInfo: AvatarInfo, changeVersion?: boolean): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const requestBody: Partial<AvatarInfo> = {
      name: avatarInfo.name,
      description: avatarInfo.description,
      releaseStatus: avatarInfo.releaseStatus,
      version: changeVersion ? undefined : avatarInfo.version,
    };

    console.log(requestBody);

    const response = await prepare<AvatarInfo>(getState, dispatch, {
      url: api(`avatars/${avatarInfo.id}`),
      method: 'PUT',
      body: requestBody,
    });

    if (response.type === 'entity') {
      dispatch(updateAvatarInfo(response.result));
    } else {
      console.error(response.error);
    }
  };
}

export function deleteAvatar(avatarId: string): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    const response = await prepare<unknown>(getState, dispatch, {
      url: api(`avatars/${avatarId}`),
      method: 'DELETE',
    });

    console.error(response);
  };
}
