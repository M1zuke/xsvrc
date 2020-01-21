import React, { FC } from 'react';

import './overviewAll.scss';
import { useSelector } from 'react-redux';
import { selectDisplayName } from '../../../store/user/selectors';
import { useHistory } from 'react-router';

export const OverviewAll: FC = () => {

  const username = useSelector(selectDisplayName);
  const history = useHistory();

  const navigateTo = (url: string): void => {
    history.push(url);
  };

  return (
      <div className="overview-all-component">
        <div className="overview-title">
          <h2>Welcome { username }</h2>
          <h3>Select any to manage your account</h3>
        </div>
        <div className="manage-friends button" onClick={() => navigateTo('/overview/friends')}>
          <div className="shadow" />
          <div className="description">
            Manage friends
          </div>
        </div>
        <div className="manage-favorites button" onClick={() => navigateTo('/overview/favorites')}>
          <div className="shadow" />
          <div className="description">
            Manage Favorites
          </div>
        </div>
        <div className="manage-profile button" onClick={() => navigateTo('/overview/profile')}>
          <div className="shadow" />
          <div className="description">
            Manage Profile
          </div>
        </div>
        <div className="manage-avatars button" onClick={() => navigateTo('/overview/avatars')}>
          <div className="shadow" />
          <div className="description">
            Manage Avatars
          </div>
        </div>
      </div>
  );
};
