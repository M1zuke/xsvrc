import { Lock } from '@mui/icons-material';
import React from 'react';
import { UserInfo } from '../../../../api/types';
import { PersonsInInstance } from '../../../../components/persons-in-instance/PersonsInInstance';
import { Status } from '../../../../components/status/Status';
import { TableConfig } from '../../../../components/table/Table';
import { FriendsAddedWhenSorting } from '../../../../store/friends/selectors';
import { setModal } from '../../../../store/view/actions';
import { SetModal } from '../../../../store/view/types';
import { AppDispatch } from '../../../../thunk';
import styles from './FriendList.module.scss';

export function friendListTableModel(
  userInfo: UserInfo[],
  positions: FriendsAddedWhenSorting,
  dispatch: AppDispatch,
): TableConfig {
  const routeToProfile = (ui: UserInfo): SetModal => dispatch(setModal({ type: 'friend-profile', userId: ui.id }));

  return {
    columns: [{ amount: 2, width: 'autoSize' }, { amount: 1 }],
    header: {
      id: 'friend-list-header',
      type: 'row',
      values: [{ value: 'Pos.' }, { value: 'Status' }, { value: 'Username' }],
    },
    rows: userInfo.map((ui) => ({
      id: `user-entry-${ui.id}`,
      type: 'row',
      onClick: () => routeToProfile(ui),
      values: [
        { value: positions[ui.id] },
        {
          type: 'custom',
          value: (
            <div className={styles.StatusWrapper}>
              <Status friendInfo={ui} />
              {ui.location === 'private' && (
                <div className={styles.PrivateIcon}>
                  <Lock fontSize="small" />
                </div>
              )}
              <PersonsInInstance location={ui.location} className={styles.DarkerColor} />
            </div>
          ),
        },
        { value: ui.displayName },
      ],
    })),
  };
}
