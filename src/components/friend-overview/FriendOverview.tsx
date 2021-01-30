import { Home, Lock } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isLoaded } from '../../api/prepare';
import { UserInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { routes } from '../../common/routes';
import { getTrustRank } from '../../common/trust-system';
import { useMessages } from '../../i18n';
import { selectFriendInfoById } from '../../store/friends/selectors';
import { ToolTip } from '../tool-tip/ToolTip';
import styles from './FriendOverview.module.scss';

const defaultUserInfo: UserInfo = {
  id: 'unknown',
  last_platform: '',
  status: 'offline',
  displayName: 'unknown',
  location: 'offline',
  currentAvatarThumbnailImageUrl: 'unknown',
  instanceId: 'offline',
  worldId: 'offline',
  allowAvatarCopying: false,
  bio: '',
  bioLinks: [],
  developerType: 'none',
  friendKey: '',
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
  const friendInfo = useSelector(selectFriendInfoById(friendId));
  const messages = useMessages().Views.FriendsOverview;

  const $friendInfo = useMemo(() => (isLoaded(friendInfo) ? friendInfo : defaultUserInfo), [friendInfo]);

  const avatarThumbnailImage = useMemo(
    () => ({
      backgroundImage: `url('${$friendInfo.currentAvatarThumbnailImageUrl}')`,
    }),
    [$friendInfo.currentAvatarThumbnailImageUrl],
  );
  const trustRank = useMemo(() => getTrustRank($friendInfo.tags), [$friendInfo.tags]);

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
    [styles.Active]: $friendInfo.status === 'active',
    [styles.AskMe]: $friendInfo.status === 'ask me',
    [styles.JoinMe]: $friendInfo.status === 'join me',
    [styles.Busy]: $friendInfo.status === 'busy',
  });

  const routeToProfile = useCallback(() => history.push(`${routes.friendsProfile.path}/${$friendInfo.id}`), [
    $friendInfo.id,
    history,
  ]);

  useEffect(() => {
    if (!isLoaded(friendInfo)) {
      getUser(friendId).finally();
    }
  }, [friendId, friendInfo, getUser]);

  return (
    <div className={trustRankClasses} style={avatarThumbnailImage} onClick={routeToProfile}>
      {$friendInfo.status === 'offline' && <div className={styles.Offline} />}
      {$friendInfo.location && $friendInfo.location === 'private' && (
        <div className={styles.PrivateIcon}>
          <Lock fontSize="small" />
        </div>
      )}
      {$friendInfo.location === 'offline' && $friendInfo.status !== 'offline' && (
        <ToolTip className={styles.OnlineThroughWebsite} toolTip={messages.ToolTip.LoggedTroughWebsite}>
          <Home fontSize="small" />
        </ToolTip>
      )}
      <div className={friendStatusClasses} />
      <div className={styles.DisplayName}>{$friendInfo.displayName}</div>
    </div>
  );
}
