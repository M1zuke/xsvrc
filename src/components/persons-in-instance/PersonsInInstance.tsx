import { Person } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../api/types';
import { useMessages } from '../../i18n';
import { selectFriendInfoByLocation } from '../../store/friends/selectors';
import { ToolTip } from '../tool-tip/ToolTip';
import styles from './PersonsInInstance.module.scss';

type PersonsInInstanceProps = {
  location: UserInfo['location'];
  className?: string;
};

export function PersonsInInstance({ location, className }: PersonsInInstanceProps): ReactElement {
  const friendsInSameLobby = useSelector(selectFriendInfoByLocation(location));
  const messages = useMessages().Views.SameInstance;
  if (friendsInSameLobby.length === 0 || location === 'private' || location === 'offline' || location === '') {
    return <></>;
  }
  return (
    <ToolTip
      className={classNames(styles.SameInstanceIcon, className)}
      toolTip={messages.PeopleInSameInstance(friendsInSameLobby.length)}
    >
      <Person fontSize="small" />
      {friendsInSameLobby.length}
    </ToolTip>
  );
}
