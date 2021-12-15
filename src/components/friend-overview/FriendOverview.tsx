import { Home, Lock, Person } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { routes } from '../../common/routes';
import { useTrustRank } from '../../common/trust-system';
import { isActive, isLoggedIn, isOffline } from '../../common/utils';
import { useMessages } from '../../i18n';
import { IsLoggedInUser, selectFriendInfoById, selectFriendInfoByLocation } from '../../store/friends/selectors';
import { Loading } from '../loading/Loading';
import { ToolTip } from '../tool-tip/ToolTip';
import styles from './FriendOverview.module.scss';

const defaultUserInfo: UserInfo = {
  id: 'unknown',
  last_platform: '',
  status: 'offline',
  displayName: 'unknown',
  location: 'offline',
  currentAvatarThumbnailImageUrl: 'unknown',
  profilePicOverride: '',
  fallbackAvatar: '',
  instanceId: 'offline',
  worldId: 'offline',
  allowAvatarCopying: false,
  bio: '',
  bioLinks: [],
  developerType: 'none',
  friendKey: '',
  last_activity: 'N.A.',
  last_login: 'N.A.',
  statusDescription: 'N.A.',
  tags: [],
  userIcon: '',
  username: 'unknown',
  isFriend: false,
  state: 'offline',
  currentAvatarImageUrl: '',
};

type FriendOverviewProps = {
  friendId: string;
  small?: boolean;
};

export function FriendOverview({ friendId, small }: FriendOverviewProps): ReactElement {
  const history = useHistory();
  const { getUser } = useApi();
  const isLoggedInUser = useSelector(IsLoggedInUser(friendId));
  const friendInfo = useSelector(selectFriendInfoById(friendId));
  const friendsInSameLobby = useSelector(selectFriendInfoByLocation(friendInfo));
  const messages = useMessages().Views.FriendsOverview;

  const $friendInfo = useMemo(() => (isLoaded(friendInfo) ? friendInfo : defaultUserInfo), [friendInfo]);

  const avatarThumbnailImage = useMemo(() => {
    const url = $friendInfo.profilePicOverride || $friendInfo.currentAvatarThumbnailImageUrl;
    return {
      backgroundImage: `url('${url}')`,
    };
  }, [$friendInfo.currentAvatarThumbnailImageUrl, $friendInfo.profilePicOverride]);
  const trustRank = useTrustRank($friendInfo.tags);

  const trustRankClasses = classNames(styles.Component, {
    [styles.Visitor]: trustRank === 'Visitor',
    [styles.NewUser]: trustRank === 'New User',
    [styles.User]: trustRank === 'User',
    [styles.KnownUser]: trustRank === 'Known User',
    [styles.TrustedUser]: trustRank === 'Trusted User' || trustRank === 'Veteran User',
    [styles.LegendaryUser]: trustRank === 'Legendary User',
    [styles.Small]: small,
  });

  const friendStatusClasses = classNames(styles.Status, {
    [styles.Active]: $friendInfo.status === 'active' && isLoggedIn($friendInfo),
    [styles.AskMe]: $friendInfo.status === 'ask me' && isLoggedIn($friendInfo),
    [styles.JoinMe]: $friendInfo.status === 'join me' && isLoggedIn($friendInfo),
    [styles.Busy]: $friendInfo.status === 'busy' && isLoggedIn($friendInfo),
  });

  const routeToProfile = useCallback(
    () => history.push(`${routes.friendsProfile.path}/${$friendInfo.id}`),
    [$friendInfo.id, history],
  );

  useEffect(() => {
    if (!isLoaded(friendInfo)) {
      getUser(friendId).finally();
    }
  }, [friendId, friendInfo, getUser]);

  return (
    <div className={trustRankClasses} style={avatarThumbnailImage} onClick={routeToProfile}>
      {!$friendInfo.isFriend && !isLoggedInUser && (
        <div className={styles.Loading}>
          <Loading />
        </div>
      )}
      {isOffline($friendInfo) && <div className={styles.Offline} />}
      {$friendInfo.location === 'private' && (
        <div className={styles.PrivateIcon}>
          <Lock fontSize="small" />
        </div>
      )}
      {isActive($friendInfo) && (
        <ToolTip className={styles.OnlineThroughWebsite} toolTip={messages.ToolTip.LoggedTroughWebsite}>
          <Home fontSize="small" />
        </ToolTip>
      )}
      {friendsInSameLobby.length > 0 && (
        <ToolTip
          className={styles.SameInstanceIcon}
          toolTip={messages.ToolTip.PeopleInSameInstance(friendsInSameLobby.length)}
        >
          <Person fontSize="small" />
          {friendsInSameLobby.length}
        </ToolTip>
      )}
      <div className={friendStatusClasses} />
      <div className={styles.DisplayName}>{$friendInfo.displayName}</div>
    </div>
  );
}
