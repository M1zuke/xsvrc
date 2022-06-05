import { addModeration, deleteModeration, setModerations } from '../store/user/actions';
import { AsyncAppAction } from '../thunk';
import { api, prepare } from './prepare';
import { Moderation, ModerationType, UserInfo } from './types';

export function getAllModerations(): AsyncAppAction {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.user.moderations === null) {
      dispatch(setModerations('loading'));
    }
    const result = await prepare<Moderation[]>(getState, dispatch, {
      url: api('auth/user/playermoderations'),
    });

    if (result.type === 'entity') {
      dispatch(setModerations(result.result));
    }
  };
}

export function moderateUser(userId: UserInfo['id'], type: ModerationType): AsyncAppAction {
  return async function (dispatch, getState) {
    const result = await prepare<Moderation>(getState, dispatch, {
      url: api('auth/user/playermoderations'),
      method: 'POST',
      body: {
        moderated: userId,
        type,
      },
    });
    if (result.type === 'entity') {
      if (type === 'showAvatar' || type === 'hideAvatar') {
        await unModerateUser(userId, 'hideAvatar');
        await unModerateUser(userId, 'showAvatar');
        dispatch(deleteModeration(userId, 'hideAvatar'));
        dispatch(deleteModeration(userId, 'showAvatar'));
      }
      dispatch(addModeration(result.result));
    }
  };
}
export function unModerateUser(userId: UserInfo['id'], type: ModerationType): AsyncAppAction {
  return async function (dispatch, getState) {
    await prepare(getState, dispatch, {
      url: api('auth/user/unplayermoderate'),
      method: 'PUT',
      body: {
        moderated: userId,
        type,
      },
    });
  };
}
