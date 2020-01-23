import React, { FC, useCallback } from 'react';

import './profile.scss';
import { ProfileBio } from './bio/profileBio';
import { useSelector } from 'react-redux';
import { selectDisplayName } from '../../../store/user/selectors';
import { AvatarInfo } from './avatarInfo/avatarInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { useHistory } from 'react-router';

export const OverviewProfile: FC = () => {
  const displayName: string | undefined = useSelector(selectDisplayName);
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
      <div className="overview-profile-component">
        <div className="back-btn" onClick={ goBack }>
          <FontAwesomeIcon icon={ faAngleLeft } size="3x" />
        </div>
        <h2 className="overview-profile-title">
          Profile overview: { displayName }
        </h2>
        <div className="profile-bio">
          <ProfileBio />
        </div>
        <div className="profile-info">
          <AvatarInfo />
        </div>
      </div>
  );
};
