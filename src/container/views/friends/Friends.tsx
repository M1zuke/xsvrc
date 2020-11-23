import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ifLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { FriendOverview } from '../../../components/friend-overview/FriendOverview';
import { Grid } from '../../../components/grid/Grid';
import { LoadableContent } from '../../../components/loadable-content/LoadableContent';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { friendInfo } from '../../../store/friends/selectors';
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
  const friendsInfos = useSelector(friendInfo);
  const [filter, setFilter] = useState<CharacterFilter>('ALL');
  const [showPrivate, setShowPrivate] = useState(true);

  const friendInfoWithOrWithoutPrivate = useMemo(() => {
    if (ifLoaded(friendsInfos) && !showPrivate) {
      return friendsInfos.filter((fi) => fi.location !== 'private');
    }
    return friendsInfos;
  }, [friendsInfos, showPrivate]);

  const disableFilterButton = useCallback(
    (key: CharacterFilter) => {
      if (!ifLoaded(friendInfoWithOrWithoutPrivate)) {
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
    if (!ifLoaded(friendInfoWithOrWithoutPrivate) || filter === 'ALL') {
      return friendInfoWithOrWithoutPrivate;
    }
    if (filter === '#') {
      return friendInfoWithOrWithoutPrivate.filter(
        (o) => !CharacterFilters.includes(o.displayName[0].toUpperCase() as CharacterFilter),
      );
    }
    return friendInfoWithOrWithoutPrivate.filter((fi) => fi.displayName.startsWith(filter));
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
    friends().finally();

    const interval = setInterval(() => {
      friends().finally();
    }, 25000);

    return () => {
      clearInterval(interval);
    };
  }, [friends]);

  return (
    <div className={styles.Component}>
      <div className={styles.FilterButtons}>
        <div className={styles.NormalFilter}>{filterButtons}</div>
        <div className={styles.SpecialFilter}>
          <Checkbox label="Show Private" onClick={setShowPrivate} value={showPrivate} />
        </div>
      </div>
      <ScrollableContent>
        <LoadableContent data={filteredFriendInfo}>
          {(data) => (
            <Grid columns={8}>
              {data.map((friendInfo) => (
                <FriendOverview friendInfo={friendInfo} key={`Friends-Overview-${friendInfo.displayName}`} />
              ))}
            </Grid>
          )}
        </LoadableContent>
      </ScrollableContent>
    </div>
  );
}
