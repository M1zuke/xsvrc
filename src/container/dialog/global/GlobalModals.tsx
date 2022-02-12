import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { setModal } from '../../../store/view/actions';
import { GetModal } from '../../../store/view/selectors';
import { useAppDispatch } from '../../../thunk/dispatch';
import { FriendProfileModal } from '../../views/friends/friend-profile/FriendProfileModal';

export function GlobalModals(): ReactElement {
  const modal = useSelector(GetModal);
  const dispatch = useAppDispatch();

  const resetModal = useCallback(() => dispatch(setModal(null)), [dispatch]);

  return (
    <>
      {modal && modal.type === 'friend-profile' && (
        <FriendProfileModal userId={modal.userId} onCanceled={resetModal} onConfirmed={resetModal} />
      )}
    </>
  );
}
