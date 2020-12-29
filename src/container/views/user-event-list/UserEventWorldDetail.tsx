import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../../../api/use-api';
import { selectWorldByLocation } from '../../../store/user-events/selectors';
import styles from './UserEventList.module.scss';

type UserEventWorldDetailProps = {
  worldId: string;
};

export function UserEventWorldDetail({ worldId }: UserEventWorldDetailProps): ReactElement {
  const { getWorld } = useApi();
  const worldInfo = useSelector(selectWorldByLocation(worldId));

  useEffect(() => {
    if (worldInfo === null) {
      getWorld(worldId).finally();
    }
  }, [getWorld, worldId, worldInfo]);

  if (worldInfo && typeof worldInfo !== 'string') {
    const backgroundImage = {
      backgroundImage: `url('${worldInfo.thumbnailImageUrl}')`,
    };
    return (
      <div className={`${styles.UserEventDetail} ${styles.Thumbnail}`} style={backgroundImage}>
        <div className={styles.WorldName}>{worldInfo.name}</div>
      </div>
    );
  }
  return <div className={styles.UserEventDetail}>{worldId}</div>;
}
