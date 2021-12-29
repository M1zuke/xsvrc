import { Person } from '@mui/icons-material';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { InstanceInfo, UserInfo, WorldInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { useSubscribe } from '../../common/use-subscribe';
import { isActive } from '../../common/utils';
import { useMessages } from '../../i18n';
import { selectFriendInfoById } from '../../store/friends/selectors';
import { selectUserInfo } from '../../store/user/selectors';
import { GetInstanceTypeInfo, selectInstanceByInstance, selectWorldByLocation } from '../../store/worlds/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import { Loading } from '../loading/Loading';
import { ScrollableContent } from '../scrollable-content/ScrollableContent';
import { Table } from '../table/Table';
import { useToast } from '../toast/Toast';
import { useUserListTableModel } from './user-list-table-model';
import styles from './WorldInstance.module.scss';

type WorldInstanceInnerProps = {
  user: UserInfo;
  worldInfo: WorldInfo;
  instanceInfo: InstanceInfo;
};

export function WorldInstanceInner({ user, worldInfo, instanceInfo }: WorldInstanceInnerProps): ReactElement {
  const messages = useMessages();
  const userInfo = useSelector(selectUserInfo);
  const userTableModel = useUserListTableModel(user.location, instanceInfo);
  const [toasts, show] = useToast();

  const instanceTypeInfo = useSelector(GetInstanceTypeInfo(user.location));
  const ownerUserInfo = useSelector(selectFriendInfoById(instanceInfo.ownerId || ''));
  const { getUser, selfInvite } = useApi();

  const splitLocation = user.location.split('~');
  const [, instanceId] = splitLocation[0].split(':');

  const worldImage = useMemo(
    () => ({
      backgroundImage: `url('${worldInfo.thumbnailImageUrl}')`,
    }),
    [worldInfo],
  );

  const userIsInSameInstance = useMemo(
    () => (isLoaded(userInfo) ? userInfo.location === user.location : false),
    [user.location, userInfo],
  );

  const ownerName = useMemo(
    () =>
      isLoaded(ownerUserInfo) ? ownerUserInfo.displayName : instanceInfo.ownerId ? 'Loading...' : worldInfo.authorName,
    [instanceInfo.ownerId, ownerUserInfo, worldInfo.authorName],
  );

  const inviteSelf = useCallback(() => {
    selfInvite(user.location).then(() => {
      show('Self invite send');
    });
  }, [selfInvite, show, user.location]);
  const copyLocation = useCallback(() => {
    navigator.clipboard.writeText(user.location).then(() => {
      show('Instance location copied');
    });
  }, [show, user.location]);

  useEffect(() => {
    if (isLoaded(instanceInfo) && instanceInfo.ownerId) {
      getUser(instanceInfo.ownerId).finally();
    }
  }, [getUser, instanceInfo]);

  return (
    <Content className={styles.WorldInstance}>
      {toasts}
      <div className={styles.WorldImage} style={worldImage}>
        <div className={styles.LeftWorldInfo}>
          <div className={styles.InstanceId}>#{instanceId}</div>
          <div className={styles.InstanceOwner}>{ownerName}</div>
          <div className={styles.InstanceType}>{messages.Views.WorldDetail.Type[instanceTypeInfo]}</div>
          <div className={styles.Region}>{instanceInfo.region.toUpperCase()}</div>
        </div>

        <div className={styles.RightWorldInfo}>
          {userIsInSameInstance && <div className={styles.YouAreHere}>You are here</div>}
          <div className={styles.HowManyInThere}>
            <Person />
            {instanceInfo.n_users}/{instanceInfo.capacity}
          </div>
        </div>

        <div className={styles.WorldName}>{worldInfo.name}</div>
      </div>
      <ScrollableContent className={styles.UserList}>
        <Table config={userTableModel} />
      </ScrollableContent>
      <Content className={styles.InstanceActions} noPadding translucent>
        <Button onClick={inviteSelf} className={styles.ButtonOverwrite}>
          Invite me
        </Button>
        <Button onClick={copyLocation} className={styles.ButtonOverwrite}>
          Copy Instance Location
        </Button>
      </Content>
    </Content>
  );
}

type WorldInstanceProps = {
  user: UserInfo;
};

export function WorldInstance({ user }: WorldInstanceProps): ReactElement {
  const worldInfo = useSelector(selectWorldByLocation(user.location));
  const instanceInfo = useSelector(selectInstanceByInstance(user.location));
  const { getWorld, getInstance } = useApi();
  useSubscribe(getInstance, user.location);

  useEffect(() => {
    if (user.location !== 'private' && user.location !== '' && user.location !== 'offline') {
      if (!isLoaded(worldInfo)) {
        getWorld(user.location).finally();
      }
    }
  }, [getWorld, user.location, worldInfo]);

  if (isActive(user)) {
    return <ScrollableContent>Logged in through Website</ScrollableContent>;
  }

  if (worldInfo === 'private' || worldInfo === 'offline') {
    return <ScrollableContent>{worldInfo}</ScrollableContent>;
  }

  if (isLoaded(worldInfo) && isLoaded(instanceInfo)) {
    return <WorldInstanceInner user={user} instanceInfo={instanceInfo} worldInfo={worldInfo} />;
  }

  return <Loading />;
}
