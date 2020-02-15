import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectDisplayName } from '../../../store/user/selectors';
import { BackButton } from '../../common/backButton';
import { AvatarInfo } from './avatarInfo/avatarInfo';
import { ProfileBio } from './bio/profileBio';

import './profile.scss';

export const OverviewProfile: FC = () => {
  const displayName: string | undefined = useSelector(selectDisplayName);

  return (
    <div className="overview-profile-component">
      <BackButton />

      <h2 className="overview-profile-title">
        Profile overview: {displayName}
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
