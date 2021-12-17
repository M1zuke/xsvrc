import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { MappedFavoritesToGroupWithUser } from '../../api/types';
import { TitleBox } from '../../container/views/home/TitleBox';
import { GetFavoriteGroups, selectUserInfo } from '../../store/user/selectors';
import { FriendOverview } from '../friend-overview/FriendOverview';
import styles from './FriendFavoriteList.module.scss';

type MappedToJSXElement = {
  [key: string]: JSX.Element[];
};

type FavoriteListProps = {
  favorites: MappedFavoritesToGroupWithUser;
};

export function FriendFavoriteList({ favorites }: FavoriteListProps): ReactElement {
  const userInfo = useSelector(selectUserInfo);
  const favoriteGroupNames = useSelector(GetFavoriteGroups('friend'));

  const favoritesByGroup = useMemo<MappedToJSXElement>(() => {
    return Object.assign(
      {},
      ...favoriteGroupNames.map((group) => {
        return {
          [group.name]:
            favorites[group.name]?.map((user, userIndex) => {
              if (user !== 'not-found') {
                if (typeof user === 'string') {
                  return <FriendOverview key={user} friendId={user} />;
                }
                return <FriendOverview key={user.id} friendId={user.id} />;
              }
              return <div key={`not-found-${userIndex}`}>-</div>;
            }) ?? [],
        };
      }),
    );
  }, [favorites, favoriteGroupNames]);

  const allFriendFavoriteGroups = useMemo(
    () =>
      favoriteGroupNames.flatMap((group) => {
        return (
          <TitleBox key={group.name} title={group.displayName} className={styles.FavoritesList}>
            {favoritesByGroup[group.name]}
          </TitleBox>
        );
      }),
    [favoritesByGroup, favoriteGroupNames],
  );

  if (!isLoaded(userInfo)) {
    return <></>;
  }

  return <>{allFriendFavoriteGroups}</>;
}
