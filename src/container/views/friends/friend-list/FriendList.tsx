import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../../../api/types';
import { Pagination } from '../../../../components/pagination/Pagination';
import { Table } from '../../../../components/table/Table';
import { getPosition } from '../../../../store/friends/selectors';
import { useAppDispatch } from '../../../../thunk/dispatch';
import { friendListTableModel } from './friend-list-table-model';

type FriendListProps = {
  friendInfo: UserInfo[];
};

export function FriendList({ friendInfo }: FriendListProps): ReactElement {
  const dispatch = useAppDispatch();
  const positions = useSelector(getPosition);

  const sortedUserInfo = friendInfo.sort((a, b) => {
    const aPos = positions[a.id];
    const bPos = positions[b.id];

    return aPos - bPos;
  });

  const tableModel = useCallback(
    (data: UserInfo[]) => {
      return friendListTableModel(data, positions, dispatch);
    },
    [dispatch, positions],
  );

  return (
    <Pagination data={sortedUserInfo} pageSize={50}>
      {(data) => <Table config={tableModel(data)} />}
    </Pagination>
  );
}
