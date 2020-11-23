import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ifLoaded } from '../../../../api/prepare';
import { Content } from '../../../../components/content/Content';
import { messages } from '../../../../i18n/en';
import { friendInfo } from '../../../../store/friends/selectors';
import styles from './FriendsProfile.module.scss';

export function FriendProfile(): ReactElement {
  const { id } = useParams();
  const friendInfos = useSelector(friendInfo);

  const profile = useMemo(() => {
    if (ifLoaded(friendInfos)) {
      return friendInfos.find((o) => o.id === id);
    }
    return;
  }, [friendInfos, id]);

  if (!profile) {
    return <div className={styles.NotFound}>{messages.Views.FriendsProfile.NotFound}</div>;
  }
  return (
    <div className={styles.Component}>
      <Content></Content>
    </div>
  );
}
