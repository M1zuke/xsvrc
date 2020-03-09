import { faUnity } from '@fortawesome/free-brands-svg-icons/faUnity';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectDisplayName } from '../../../store/user/selectors';

import './overviewAll.scss';

export const OverviewAll: FC = () => {

  const username = useSelector(selectDisplayName);
  const history = useHistory();

  const navigateTo = useCallback((url: string): void => {
    history.push(url);
  }, [history]);

  /* sendNotification('testNotification', 'Test', (e) => {
    console.log('click', e);
  }); */

  return (
    <div className="overview-all-component">
      <div className="overview-title">
        <h2>Welcome {username}</h2>
        <h3>Select any to manage your account</h3>
      </div>
      <div className="manage-friends button" onClick={() => navigateTo('/overview/friends')}>
        <FontAwesomeIcon icon={faUsers} size="8x" />
        <h2>Friends (Online & Offline)</h2>
      </div>
      <div className="manage-favorites button" onClick={() => navigateTo('/overview/favorites')}>
        <FontAwesomeIcon icon={faStar} size="8x" />
        <h2>Favorites</h2>
      </div>
      <div className="manage-avatars button" onClick={() => navigateTo('/overview/avatars')}>
        <FontAwesomeIcon icon={faUnity} size="8x" />
        <h2>Avatars</h2>
      </div>
      <div className="manage-profile button" onClick={() => navigateTo('/overview/profile')}>
        <FontAwesomeIcon icon={faUserCircle} size="8x" />
        <h2>Profile</h2>
      </div>
      <div className="moderation-profile button" onClick={() => navigateTo('/overview/moderation')}>
        <FontAwesomeIcon icon={faInfoCircle} size="8x" />
        <h2>Moderations</h2>
      </div>
    </div>
  );
};
