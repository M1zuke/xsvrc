import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { isOnline } from '../../../common/utils';
import { Button } from '../../../components/button/Button';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { Content } from '../../../components/content/Content';
import { FriendOverview } from '../../../components/friend-overview/FriendOverview';
import { TextInput } from '../../../components/input/TextInput';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { setFriendFilter } from '../../../store/friends/actions';
import { selectFriendFilter, selectFriendInfo } from '../../../store/friends/selectors';
import { FriendFilter } from '../../../store/friends/state';
import styles from './Friends.module.scss';

export const CharacterFilters = [
  'ALL',
  '#',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
] as const;
export type CharacterFilter = typeof CharacterFilters[number];

type FriendFilterUpdate = { [P in keyof FriendFilter]: (value: FriendFilter[P]) => void };

export function Friends(): ReactElement {
  const messages = useMessages();
  const friends = useSelector(selectFriendInfo);
  const { characterFilter, showOffline, showPrivate } = useSelector(selectFriendFilter);
  const dispatch = useDispatch();
  const [userNameFilter, setUserNameFilter] = useState('');

  const handleFilterUpdate: FriendFilterUpdate = useMemo(
    () => ({
      characterFilter: (value) => dispatch(setFriendFilter({ characterFilter: value })),
      showPrivate: (value) => dispatch(setFriendFilter({ showPrivate: value })),
      showOffline: (value) => dispatch(setFriendFilter({ showOffline: value })),
    }),
    [dispatch],
  );

  const friendInfo = useMemo(() => {
    if (isLoaded(friends)) {
      const friendInfo = Object.values(friends);
      const withOffline = showOffline ? friendInfo : friendInfo.filter((fi) => isOnline(fi));
      return showPrivate ? withOffline : withOffline.filter((fi) => fi.location !== 'private');
    }
    return [];
  }, [friends, showOffline, showPrivate]);

  const filteredFriendsInfo = useMemo(() => {
    if (userNameFilter !== '') {
      return friendInfo.filter((ui) => ui.displayName.toLowerCase().includes(userNameFilter.toLowerCase()));
    }

    if (characterFilter === 'ALL') {
      return friendInfo;
    }
    if (characterFilter === '#') {
      return friendInfo.filter((o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter));
    }
    return friendInfo.filter((fi) => fi.displayName[0].toUpperCase() === characterFilter);
  }, [characterFilter, friendInfo, userNameFilter]);

  const disableFilterButton = useCallback(
    (key: CharacterFilter) => {
      if (key === 'ALL') {
        return false;
      }

      if (key === '#') {
        return (
          friendInfo.filter((o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter))
            .length === 0
        );
      }

      return friendInfo.filter((o) => o.displayName[0].toLowerCase() === key.toLowerCase()).length === 0;
    },
    [friendInfo],
  );

  const filterButtons = useMemo(
    () =>
      CharacterFilters.map((key) => (
        <Button
          key={`select-filter-button-${key}`}
          aria-label={`select-filter-button-${key}`}
          onClick={() => handleFilterUpdate['characterFilter'](key)}
          active={characterFilter === key}
          disabled={disableFilterButton(key)}
        >
          {key}
        </Button>
      )),
    [characterFilter, disableFilterButton, handleFilterUpdate],
  );

  const [filteredFriendsCount, friendsCount] = useMemo(
    () => [filteredFriendsInfo.length, isLoaded(friends) ? Object.values(friends).length : 0],
    [filteredFriendsInfo.length, friends],
  );

  return (
    <div className={styles.Component}>
      <Content className={styles.FriendsCountWrapper}>
        <div className={styles.ShortOverview}>
          <div className={styles.AllOnlineFriendsCount}>{friendsCount}</div>
          <div className={styles.FilteredFriendsCount}>{filteredFriendsCount}</div>
          <div className={styles.FriendsOnline}>{messages.Views.Friends.FriendsOnline}</div>
        </div>
        <div className={styles.SpecialFilter}>
          <div className={styles.SearchByName}>
            <TextInput
              aria-label="enter username"
              value={userNameFilter}
              onChange={(value) => setUserNameFilter(value)}
              placeholder={messages.Views.Login.View.Username}
            />
          </div>
          <Checkbox
            label={messages.Views.Friends.ShowOffline}
            onChange={handleFilterUpdate['showOffline']}
            value={showOffline}
          />
          <Checkbox
            label={messages.Views.Friends.ShowPrivate}
            onChange={handleFilterUpdate['showPrivate']}
            value={showPrivate}
          />
        </div>
      </Content>
      <Content className={styles.FilterButtons}>
        <div className={styles.NormalFilter}>{filterButtons}</div>
      </Content>
      <ScrollableContent>
        <div className={styles.FriendsList}>
          {filteredFriendsInfo.map((friendInfo) => (
            <FriendOverview friendId={friendInfo.id} key={`Friends-Overview-${friendInfo.id}`} />
          ))}
        </div>
      </ScrollableContent>
    </div>
  );
}
