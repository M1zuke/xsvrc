import { ViewComfy, ViewList } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { isOnline } from '../../../common/utils';
import { Button } from '../../../components/button/Button';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { FriendOverview } from '../../../components/friend-overview/FriendOverview';
import { TextInput } from '../../../components/input/TextInput';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { useMessages } from '../../../i18n';
import { setFriendFilter } from '../../../store/friends/actions';
import { selectFriendFilter, selectFriendInfo } from '../../../store/friends/selectors';
import { FriendFilter } from '../../../store/friends/state';
import { useAppDispatch } from '../../../thunk/dispatch';
import { TitleBox } from '../home/TitleBox';
import { FriendList } from './friend-list/FriendList';
import styles from './Friends.module.scss';

type FriendFilterUpdate = { [P in keyof FriendFilter]: (value: FriendFilter[P]) => void };

export function Friends(): ReactElement {
  const messages = useMessages();
  const friends = useSelector(selectFriendInfo);
  const { asList, showOffline, showPrivate } = useSelector(selectFriendFilter);
  const dispatch = useAppDispatch();
  const [userNameFilter, setUserNameFilter] = useState('');

  const handleFilterUpdate: FriendFilterUpdate = useMemo(
    () => ({
      showPrivate: (value) => dispatch(setFriendFilter({ showPrivate: value })),
      showOffline: (value) => dispatch(setFriendFilter({ showOffline: value })),
      asList: (value) => dispatch(setFriendFilter({ asList: value })),
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

    return friendInfo;
  }, [friendInfo, userNameFilter]);

  const [filteredFriendsCount, friendsCount] = useMemo(
    () => [filteredFriendsInfo.length, isLoaded(friends) ? Object.values(friends).length : 0],
    [filteredFriendsInfo.length, friends],
  );

  const friendOverviews = useMemo(() => {
    if (asList) {
      return <FriendList friendInfo={filteredFriendsInfo} />;
    }

    return filteredFriendsInfo.map((friendInfo) => (
      <FriendOverview asList={asList} friendId={friendInfo.id} key={`Friends-Overview-${friendInfo.id}`} />
    ));
  }, [asList, filteredFriendsInfo]);

  return (
    <div className={styles.Component}>
      <TitleBox className={styles.FriendsCountWrapper} title="Friends">
        <div className={styles.ShortOverview}>
          <div className={styles.AllOnlineFriendsCount}>{friendsCount}</div>
          <div className={styles.FilteredFriendsCount}>{filteredFriendsCount}</div>
          <div className={styles.FriendsOnline}>{messages.Views.Friends.FriendsOnline}</div>
        </div>
        <div className={styles.SpecialFilter}>
          <div className={styles.SearchByName}>
            <TextInput
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
          <Button onClick={() => handleFilterUpdate['asList'](false)} icon active={!asList}>
            <ViewComfy />
          </Button>
          <Button onClick={() => handleFilterUpdate['asList'](true)} icon active={asList}>
            <ViewList />
          </Button>
        </div>
      </TitleBox>
      <ScrollableContent translucent={asList} noPadding={asList}>
        <div className={classNames(styles.FriendsList, { [styles.AsList]: asList })}>{friendOverviews}</div>
      </ScrollableContent>
    </div>
  );
}
