import { AvatarActionTypes, SET_AVATAR_FETCHING, SET_AVATAR_NOT_FOUND_ERROR, SetAvatarFetchingAction, SetAvatarNotFoundErrorAction, UPDATE_AVATAR_INFO, UpdateAvatarInfoAction } from './types';
import { isAction } from '../../costumTypes/typeUtils';

export interface AvatarState {
  avatarId: string;
  avatarInfoFetching: boolean;
  avatarInfoFetched: boolean;
  avatarInfo: AvatarInfo;
  avatarNotFoundError: boolean;
}

const initialState: AvatarState = {
  avatarId: '',
  avatarInfoFetched: false,
  avatarNotFoundError: false,
  avatarInfoFetching: true,
  avatarInfo: {
    id: '',
    name: '',
    description: '',
    authorId: '',
    authorName: '',
    tags: [],
    assetUrl: '',
    imageUrl: '',
    thumbnailImageUrl: '',
    releaseStatus: 'public',
    version: -1,
    featured: false,
    unityPackages: [],
    unityPackageUpdated: false,
    unityPackageURL: '',
  },
};

export function avatarReducer(state: AvatarState = initialState, action: AvatarActionTypes): AvatarState {
  if (isAction<UpdateAvatarInfoAction>(action, UPDATE_AVATAR_INFO)) {
    return {
      ...state,
      avatarId: action.payload.id!,
      avatarInfo: { ...action.payload },
      avatarInfoFetching: false,
      avatarInfoFetched: true,
    };
  }

  if (isAction<SetAvatarNotFoundErrorAction>(action, SET_AVATAR_NOT_FOUND_ERROR)) {
    return {
      ...initialState,
      avatarId: action.payload,
      avatarInfoFetched: true,
      avatarInfoFetching: false,
      avatarNotFoundError: true,
      avatarInfo: {
        ...state.avatarInfo,
        id: action.payload,
      },
    };
  }

  if (isAction<SetAvatarFetchingAction>(action, SET_AVATAR_FETCHING)) {
    return {
      ...state,
      avatarInfoFetched: false,
      avatarInfoFetching: true,
      avatarNotFoundError: false,
    };
  }

  return state;
}
