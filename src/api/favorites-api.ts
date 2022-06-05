import { mergeWith } from 'lodash';
import { AppState } from '../store';
import { addFavorite, removeFavorite, setFavoriteGroups, setFavorites } from '../store/user/actions';
import { AppDispatch, AsyncAppAction } from '../thunk';
import { api, isLoaded, prepare } from './prepare';
import {
  AddFavorite,
  Favorite,
  FavoriteGroup,
  FavoriteType,
  MappedFavoritesToGroup,
  MappedFavoritesToType,
  NamedFavorite,
  UserInfo,
} from './types';

const limit = 100;

export function getAllFavorites(favorites: Favorite[] = [], offset = 0): AsyncAppAction {
  return async function (dispatch, getState) {
    const state = getState();

    if (state.user.favorites === null) {
      dispatch(setFavorites('loading'));
    }

    const response = await prepare<Favorite[]>(state, dispatch, {
      url: api(`favorites`),
      params: [
        { key: 'offset', value: offset },
        { key: 'n', value: limit },
      ],
    });

    if (response.type === 'entity') {
      const newFavorites = [...favorites, ...response.result];
      if (response.result.length > 0) {
        return dispatch(getAllFavorites(newFavorites, offset + limit));
      }
      mapFavoritesToStore(newFavorites, getState(), dispatch);
    }
  };
}

function mapFavoritesToStore(favorites: Favorite[], state: AppState, dispatch: AppDispatch): void {
  const mappedFavoritesToType = mapFavoritesToType(favorites);
  dispatch(setFavorites(mappedFavoritesToType));
}

function mapFavoritesToType(favorites: Favorite[]): MappedFavoritesToType {
  return {
    friend: mapToFavoritesGroup(favorites, 'friend'),
    world: mapToFavoritesGroup(favorites, 'world'),
    avatar: mapToFavoritesGroup(favorites, 'avatar'),
  };
}

function mapToFavoritesGroup(favorites: Favorite[], type: FavoriteType): MappedFavoritesToGroup {
  const filteredFavorites = favorites.filter((fav) => fav.type === type);
  let groups = {};
  const mapped = filteredFavorites.map((fav) => ({
    [fav.tags[0]]: [fav],
  }));
  Object.values(mapped).forEach((obj) => {
    groups = mergeWith(groups, obj, customizer);
  });
  return groups;
}

function customizer<T>(objValue: T[], srcValue: T[]): T[] | undefined {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export function addToFavorites(user: UserInfo, favGroup: string): AsyncAppAction {
  return async function (dispatch, getState) {
    const state = getState();

    const body: AddFavorite = {
      type: 'friend',
      favoriteId: user.id,
      tags: [favGroup],
    };

    const response = await prepare<Favorite>(state, dispatch, {
      url: api(`favorites`),
      method: 'POST',
      body: body,
    });

    if (response.type === 'entity') {
      dispatch(addFavorite(response.result));
    } else {
      console.error(response);
    }
  };
}

export function removeFromFavorites(favorite: Favorite | NamedFavorite): AsyncAppAction {
  return async function (dispatch, getState) {
    const response = await prepare(getState, dispatch, {
      url: api(`favorites/${favorite.id}`),
      method: 'DELETE',
    });

    if (response.type === 'entity') {
      dispatch(removeFavorite(favorite));
    } else {
      console.error(response);
    }
  };
}

export function getAllFavoriteGroups(favorites: FavoriteGroup[] = [], offset = 0): AsyncAppAction {
  return async function (dispatch, getState) {
    const state = getState();

    // if (state.user.favorites === null) {
    //   dispatch(setFavorites('loading'));
    // }

    if (isLoaded(state.user.userInfo)) {
      const response = await prepare<FavoriteGroup[]>(state, dispatch, {
        url: api(`favorite/groups`),
        params: [
          { key: 'offset', value: offset },
          { key: 'n', value: limit },
          { key: 'userId', value: state.user.userInfo.id },
        ],
      });

      if (response.type === 'entity') {
        const newFavoriteGroups = [...favorites, ...response.result];
        if (response.result.length > 0) {
          return dispatch(getAllFavoriteGroups(newFavoriteGroups, offset + limit));
        }

        dispatch(setFavoriteGroups(newFavoriteGroups));
      }
    }
  };
}
