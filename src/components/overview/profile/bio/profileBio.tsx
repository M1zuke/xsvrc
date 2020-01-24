import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/rootReducer';
import { selectUserInfo } from '../../../../store/user/selectors';

import './profileBio.scss';
import { Table, TableConfig } from '../../../utils/table/table';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

interface ProfileBioState {
  emailObfuscated: boolean;
}

export const ProfileBio: FC = () => {

  const [state, setState] = useState<ProfileBioState>({
    emailObfuscated: true,
  });

  const { id, displayName, obfuscatedEmail, email } = useSelector<RootState, UserInfo>(selectUserInfo);

  const onEmailAction = useCallback(() => {
    setState({
      emailObfuscated: !state.emailObfuscated,
    });
  }, [setState, state]);

  const tableProps: TableConfig = {
    header: [],
    data: [
      {
        name: 'User ID',
        value: id,
        separate: true,
        actions: [],
      },
      {
        name: 'Username',
        value: displayName,
        actions: [],
      },
      {
        name: 'E-Mail',
        value: state.emailObfuscated ? obfuscatedEmail : email,
        actions: [{
          onclick: onEmailAction,
          value: state.emailObfuscated ? faEye : faEyeSlash,
        }],
      },
    ],
  };

  return (
      <div className="profile-bio-component">
        <h2>General Information</h2>
        <Table config={ tableProps } />
      </div>
  );
};
