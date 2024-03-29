import { Person } from '@mui/icons-material';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Loading } from '../../../components/loading/Loading';
import { PersonsInInstance } from '../../../components/persons-in-instance/PersonsInInstance';
import { ToolTip } from '../../../components/tool-tip/ToolTip';
import { useMessages } from '../../../i18n';
import { GetInstanceTypeInfo, selectInstanceByInstance, selectWorldByLocation } from '../../../store/worlds/selectors';
import { PropsWithSubscription } from '../../subscription-service/SubscriptionService';
import styles from './WorldDetail.module.scss';

type UserEventWorldDetailProps = {
  location: string;
};

export function WorldDetail({
  location,
  subscribe,
  unsubscribe,
}: PropsWithSubscription<UserEventWorldDetailProps>): ReactElement {
  const { getWorld, getInstance } = useApi();
  const splitLocation = location.split('~');
  const [worldId, instanceId] = splitLocation[0].split(':');

  const worldInfo = useSelector(selectWorldByLocation(location));
  const instanceInfo = useSelector(selectInstanceByInstance(location));
  const instanceTypeInfo = useSelector(GetInstanceTypeInfo(location));
  const messages = useMessages();

  useEffect(() => {
    if (location !== '' && location !== 'private' && location !== 'offline') {
      subscribe(getInstance, location, 30);
      if (!isLoaded(worldInfo)) {
        getWorld(location).finally();
      }
      if (!isLoaded(instanceInfo)) {
        getInstance(location).finally();
      }
      return () => {
        unsubscribe(location);
      };
    }
  }, [getInstance, getWorld, instanceInfo, location, subscribe, unsubscribe, worldInfo]);

  const backgroundImage = useMemo(() => {
    if (isLoaded(worldInfo) && typeof worldInfo !== 'string') {
      return {
        backgroundImage: `url('${worldInfo.thumbnailImageUrl}')`,
      };
    }
    return {};
  }, [worldInfo]);

  if (worldInfo === 'loading' || instanceInfo === 'loading') {
    return (
      <div className={styles.Component}>
        <Loading small />
      </div>
    );
  }

  if (worldInfo === 'not-found' || instanceInfo === 'not-found') {
    return <div className={styles.Component}>{messages.Views.WorldDetail.NotFound}</div>;
  }

  if (isLoaded(worldInfo) && typeof worldInfo !== 'string' && isLoaded(instanceInfo)) {
    return (
      <div className={styles.Component} style={backgroundImage}>
        <PersonsInInstance location={location} className={styles.FriendsInInstance} />

        <ToolTip
          toolTip={messages.Views.WorldDetail.PeopleInInstance(instanceInfo.n_users)}
          className={styles.PeopleInInstance}
        >
          <Person />
          {messages.Views.WorldDetail.InstanceCapacity(instanceInfo.n_users, instanceInfo.capacity)}
        </ToolTip>
        <div className={styles.WorldName}>{worldInfo.name}</div>
        <div className={styles.WorldInstanceId}>
          {messages.Views.WorldDetail.InstanceId(instanceId)} - {messages.Views.WorldDetail.Type[instanceTypeInfo]}
        </div>
      </div>
    );
  }

  return <div className={styles.UserEventDetail}>{worldId}</div>;
}
