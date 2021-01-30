import { mergeWith } from 'lodash';
import { setFavorites } from '../store/user/actions';
import { AppDispatch, AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { Favorite, FavoriteType, MappedFavoritesToGroup, MappedFavoritesToType } from './types';

const limit = 100;

export function getAllFavorites(favorites: Favorite[] = [], offset = 0): AppThunkAction<Promise<void>> {
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
      mapFavoritesToStore(newFavorites, dispatch);
    }
  };
}

function mapFavoritesToStore(favorites: Favorite[], dispatch: AppDispatch): void {
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
    [fav.tags[0]]: [fav.favoriteId],
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
