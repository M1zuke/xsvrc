import { Home, Lock } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { useTrustRank } from '../../common/trust-system';
import { isActive, isOffline } from '../../common/utils';
import { useMessages } from '../../i18n';
import { IsLoggedInUser, selectFriendInfoById } from '../../store/friends/selectors';
import { setModal } from '../../store/view/actions';
import { useAppDispatch } from '../../thunk/dispatch';
import { Loading } from '../loading/Loading';
import { PersonsInInstance } from '../persons-in-instance/PersonsInInstance';
import { Status } from '../status/Status';
import { ToolTip } from '../tool-tip/ToolTip';
import styles from './FriendOverview.module.scss';

export const defaultUserInfo: UserInfo = {
  id: 'unknown',
  last_platform: 'standalonewindows',
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
  date_joined: '',
};

type FriendOverviewProps = {
  friendId: string;
  asList?: boolean;
};

export function FriendOverview({ friendId, asList }: FriendOverviewProps): ReactElement {
  const { getUser } = useApi();
  const dispatch = useAppDispatch();
  const isLoggedInUser = useSelector(IsLoggedInUser(friendId));
  const friendInfo = useSelector(selectFriendInfoById(friendId));
  const messages = useMessages().Views.FriendsOverview;

  const $friendInfo = useMemo(() => (isLoaded(friendInfo) ? friendInfo : defaultUserInfo), [friendInfo]);

  const avatarThumbnailImage = useMemo(() => {
    if (asList) {
      return {};
    }

    const url = $friendInfo.profilePicOverride || $friendInfo.currentAvatarThumbnailImageUrl;
    return {
      backgroundImage: `url('${url}')`,
    };
  }, [$friendInfo.currentAvatarThumbnailImageUrl, $friendInfo.profilePicOverride, asList]);
  const trustRank = useTrustRank($friendInfo.tags);

  const trustRankClasses = classNames(styles.Component, {
    [styles.Visitor]: trustRank === 'Visitor',
    [styles.NewUser]: trustRank === 'New User',
    [styles.User]: trustRank === 'User',
    [styles.KnownUser]: trustRank === 'Known User',
    [styles.TrustedUser]: trustRank === 'Trusted User' || trustRank === 'Veteran User',
    [styles.LegendaryUser]: trustRank === 'Legendary User',
    [styles.AsList]: asList,
  });

  const routeToProfile = useCallback(
    () => dispatch(setModal({ type: 'friend-profile', userId: $friendInfo.id })),
    [$friendInfo.id, dispatch],
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
        <ToolTip className={styles.OnlineThroughWebsite} toolTip={messages.LoggedTroughWebsite}>
          <Home fontSize="small" />
        </ToolTip>
      )}
      <PersonsInInstance location={$friendInfo.location} className={styles.SameInstanceIcon} />
      <Status className={styles.Status} friendInfo={$friendInfo} />
      <div className={styles.DisplayName}>{$friendInfo.displayName}</div>
    </div>
  );
}
