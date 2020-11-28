import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { Content } from '../../../components/content/Content';
import { FriendOverview } from '../../../components/friend-overview/FriendOverview';
import { LoadableContent } from '../../../components/loadable-content/LoadableContent';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { messages } from '../../../i18n/en';
import { selectFriendInfo } from '../../../store/friends/selectors';
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

export function Friends(): ReactElement {
  const { friends } = useApi();
  const { active, offline } = useSelector(selectFriendInfo);
  const [filter, setFilter] = useState<CharacterFilter>('ALL');
  const [showPrivate, setShowPrivate] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  const friendsInfos = useMemo(() => (showOffline ? offline : active), [active, offline, showOffline]);

  const friendInfoWithOrWithoutPrivate = useMemo(() => {
    if (isLoaded(friendsInfos) && !showPrivate) {
      return friendsInfos.filter((fi) => fi.location !== 'private');
    }
    return friendsInfos;
  }, [friendsInfos, showPrivate]);

  const disableFilterButton = useCallback(
    (key: CharacterFilter) => {
      if (!isLoaded(friendInfoWithOrWithoutPrivate)) {
        return true;
      }

      if (key === 'ALL') {
        return false;
      }

      if (key === '#') {
        const filteredFriendInfo = friendInfoWithOrWithoutPrivate.filter(
          (o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
        );
        return filteredFriendInfo.length === 0;
      }

      const filteredFriendInfo = friendInfoWithOrWithoutPrivate.filter(
        (o) => o.displayName[0].toLowerCase() === key.toLowerCase(),
      );
      return filteredFriendInfo.length === 0;
    },
    [friendInfoWithOrWithoutPrivate],
  );

  const filteredFriendInfo = useMemo(() => {
    if (!isLoaded(friendInfoWithOrWithoutPrivate) || filter === 'ALL') {
      return friendInfoWithOrWithoutPrivate;
    }
    if (filter === '#') {
      return friendInfoWithOrWithoutPrivate.filter(
        (o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
      );
    }
    return friendInfoWithOrWithoutPrivate.filter((fi) => fi.displayName[0].toUpperCase() === filter);
  }, [filter, friendInfoWithOrWithoutPrivate]);

  const filterButtons = useMemo(() => {
    return CharacterFilters.map((key) => {
      return (
        <Button
          key={`select-filter-button-${key}`}
          aria-label={`select-filter-button-${key}`}
          onClick={() => setFilter(key)}
          active={filter === key}
          disabled={disableFilterButton(key)}
        >
          {key}
        </Button>
      );
    });
  }, [disableFilterButton, filter]);

  useEffect(() => {
    friends(showOffline).finally();

    const interval = setInterval(() => {
      friends(showOffline).finally();
    }, 25000);

    return () => {
      clearInterval(interval);
    };
  }, [friends, showOffline]);

  const [filteredFriendsCount, friendsCount] = useMemo(() => {
    if (isLoaded(friendsInfos) && isLoaded(filteredFriendInfo)) {
      return [filteredFriendInfo.length, friendsInfos.length];
    }
    return [0, 0];
  }, [filteredFriendInfo, friendsInfos]);

  return (
    <div className={styles.Component}>
      <Content className={styles.FriendsCountWrapper}>
        <div className={styles.AllOnlineFriendsCount}>{friendsCount}</div>
        <div className={styles.FilteredFriendsCount}>{filteredFriendsCount}</div>
        {messages.Views.Friends.FriendsOnline}
      </Content>
      <Content className={styles.FilterButtons}>
        <div className={styles.NormalFilter}>{filterButtons}</div>
        <div className={styles.SpecialFilter}>
          <Checkbox label={messages.Views.Friends.ShowOffline} onClick={setShowOffline} value={showOffline} />
          <Checkbox label={messages.Views.Friends.ShowPrivate} onClick={setShowPrivate} value={showPrivate} />
        </div>
      </Content>
      <ScrollableContent>
        <LoadableContent data={filteredFriendInfo}>
          {(data) => (
            <div className={styles.FriendsList}>
              {data.map((friendInfo) => (
                <FriendOverview friendInfo={friendInfo} key={`Friends-Overview-${friendInfo.displayName}`} />
              ))}
            </div>
          )}
        </LoadableContent>
      </ScrollableContent>
    </div>
  );
}
