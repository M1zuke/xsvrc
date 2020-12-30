import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Loading } from '../../../components/loading/Loading';
import { useMessages } from '../../../i18n';
import { selectWorldByLocation } from '../../../store/user-events/selectors';
import styles from './WorldDetail.module.scss';

type UserEventWorldDetailProps = {
  worldId: string;
};

export function WorldDetail({ worldId }: UserEventWorldDetailProps): ReactElement {
  const { getWorld } = useApi();
  const worldInfo = useSelector(selectWorldByLocation(worldId));
  const messages = useMessages();

  useEffect(() => {
    if (worldInfo === null && worldInfo !== 'not-found') {
      getWorld(worldId).finally();
    }
  }, [getWorld, worldId, worldInfo]);

  if (isLoaded(worldInfo) && typeof worldInfo !== 'string') {
    const backgroundImage = {
      backgroundImage: `url('${worldInfo.thumbnailImageUrl}')`,
    };
    return (
      <div className={styles.Component} style={backgroundImage}>
        <div className={styles.WorldName}>{worldInfo.name}</div>
      </div>
    );
  }

  if (worldInfo === 'loading') {
    return (
      <div className={styles.Component}>
        <Loading small />
      </div>
    );
  }

  if (worldInfo === 'not-found') {
    return <div className={styles.Component}>{messages.Views.WorldDetail.NotFound}</div>;
  }
  return <div className={styles.UserEventDetail}>{worldId}</div>;
}