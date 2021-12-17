import classNames from 'classnames';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { InstanceInfo } from '../../api/types';
import { useMessages } from '../../i18n';
import { selectFriendInfoByLocation } from '../../store/friends/selectors';
import { TableConfig } from '../table/Table';
import styles from './user-list-styles.module.scss';

export function useUserListTableModel(location: string, instanceInfo: InstanceInfo): TableConfig {
  const peopleInSameInstance = useSelector(selectFriendInfoByLocation(location));
  const messages = useMessages().Views.WorldDetail;

  return useMemo<TableConfig>(() => {
    const users = instanceInfo.users || peopleInSameInstance;

    return {
      columns: [{ amount: 3 }],
      values: users.map((user) => {
        return {
          id: user.id,
          values: [
            { value: messages.lastPlatform[user.last_platform] },
            { value: user.displayName, className: classNames({ [styles.IsFriend]: user.isFriend }) },
            { value: user.statusDescription },
          ],
        };
      }),
      header: {
        id: 'header',
        values: [{ value: '' }, { value: 'Username' }, { value: 'Status' }],
      },
    };
  }, [instanceInfo.users, messages.lastPlatform, peopleInSameInstance]);
}
