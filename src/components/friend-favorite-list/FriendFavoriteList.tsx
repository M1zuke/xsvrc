import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { MappedFavoritesToGroupWithUser } from '../../api/types';
import { TitleBox } from '../../container/views/home/TitleBox';
import { selectUserInfo } from '../../store/user/selectors';
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
  const groupNames = useMemo(() => (isLoaded(userInfo) ? userInfo.friendGroupNames : []), [userInfo]);

  const favoritesByGroup = useMemo<MappedToJSXElement>(() => {
    return Object.assign(
      {},
      ...Object.keys(favorites).map((key) => {
        const index = key.split('_').pop() ?? '0';
        return {
          [groupNames[parseInt(index)]]: favorites[key].map((user, userIndex) => {
            if (user !== 'not-found') {
              if (typeof user === 'string') {
                return <FriendOverview key={user} friendId={user} />;
              }
              return <FriendOverview key={user.id} friendId={user.id} />;
            }
            return <div key={`not-found-${userIndex}`}>-</div>;
          }),
        };
      }),
    );
  }, [favorites, groupNames]);

  const allFriendFavoriteGroups = useMemo(
    () =>
      groupNames.flatMap((group) => {
        return (
          <TitleBox key={group} title={group} className={styles.FavoritesList}>
            {favoritesByGroup[group]}
          </TitleBox>
        );
      }),
    [favoritesByGroup, groupNames],
  );

  if (!isLoaded(userInfo)) {
    return <></>;
  }

  return <>{allFriendFavoriteGroups}</>;
}
