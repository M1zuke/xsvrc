import { Person } from '@mui/icons-material';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { InstanceInfo, UserInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { useSubscribe } from '../../common/use-subscribe';
import { useMessages } from '../../i18n';
import { selectFriendInfoById } from '../../store/friends/selectors';
import { selectUserInfo } from '../../store/user/selectors';
import { GetInstanceTypeInfo, selectInstanceByInstance, selectWorldByLocation } from '../../store/worlds/selectors';
import { WorldInfos } from '../../store/worlds/state';
import { Content } from '../content/Content';
import { Loading } from '../loading/Loading';
import { ScrollableContent } from '../scrollable-content/ScrollableContent';
import { Table } from '../table/Table';
import { useUserListTableModel } from './user-list-table-model';
import styles from './WorldInstance.module.scss';

type WorldInstanceInnerProps = {
  user: UserInfo;
  worldInfo: WorldInfos;
  instanceInfo: InstanceInfo;
};

export function WorldInstanceInner({ user, worldInfo, instanceInfo }: WorldInstanceInnerProps): ReactElement {
  const messages = useMessages();
  const userInfo = useSelector(selectUserInfo);
  const userTableModel = useUserListTableModel(user.location, instanceInfo);

  const instanceTypeInfo = useSelector(GetInstanceTypeInfo(user.location));
  const ownerUserInfo = useSelector(selectFriendInfoById(instanceInfo.ownerId));
  const { getUser } = useApi();

  const splitLocation = user.location.split('~');
  const [, instanceId] = splitLocation[0].split(':');

  const worldImage = useMemo(() => {
    if (worldInfo !== 'private' && worldInfo !== 'offline') {
      return {
        backgroundImage: `url('${worldInfo.thumbnailImageUrl}')`,
      };
    }
    return {};
  }, [worldInfo]);

  const userIsInSameInstance = useMemo(
    () => (isLoaded(userInfo) ? userInfo.location === user.location : false),
    [user.location, userInfo],
  );

  const ownerName = useMemo(
    () =>
      isLoaded(ownerUserInfo)
        ? ownerUserInfo.displayName
        : isLoaded(instanceInfo) && instanceInfo.ownerId
        ? instanceInfo.ownerId
        : isLoaded(worldInfo) && worldInfo !== 'private' && worldInfo !== 'offline'
        ? worldInfo.authorName
        : 'Unknown',
    [instanceInfo, ownerUserInfo, worldInfo],
  );

  useEffect(() => {
    if (isLoaded(instanceInfo) && instanceInfo.ownerId) {
      getUser(instanceInfo.ownerId).finally();
    }
  }, [getUser, instanceInfo]);

  if (worldInfo === 'offline' || worldInfo === 'private' || user.location === '') {
    return <ScrollableContent innerClassName={styles.CenterAll}>{worldInfo}</ScrollableContent>;
  }

  if (!isLoaded(worldInfo) || !isLoaded(instanceInfo)) {
    return (
      <ScrollableContent innerClassName={styles.WorldInstance}>
        <Loading />
      </ScrollableContent>
    );
  }

  return (
    <Content className={styles.WorldInstance}>
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
  useSubscribe(getWorld, user.location);

  useEffect(() => {
    if (user.location !== 'private' && user.location !== '' && user.location !== 'offline') {
      getWorld(user.location).finally();
      getInstance(user.location).finally();
    }
  }, [getInstance, getWorld, user.location]);

  if (isLoaded(worldInfo) && isLoaded(instanceInfo)) {
    return <WorldInstanceInner user={user} instanceInfo={instanceInfo} worldInfo={worldInfo} />;
  }

  return <Loading />;
}
