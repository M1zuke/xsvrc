import React, { ReactElement, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getFavoriteGroupNames } from '../../api/friends-api';
import { isLoaded } from '../../api/prepare';
import { FriendFavoriteGroup, FriendFavoriteGroups } from '../../api/types';
import { Button } from '../../components/button/Button';
import { Modal } from '../../components/dialog/Modal';
import { useMessages } from '../../i18n';
import { selectUserInfo } from '../../store/user/selectors';
import styles from './AssignToFavoriteDialog.module.scss';
import { Dialog } from './Dialog';
import { DialogContent } from './dialog-content/DialogContent';
import { DialogFooter } from './dialog-footer/DialogFooter';
import { DialogHeader } from './dialog-header/DialogHeader';

type AssignToFavoriteDialogProps = {
  onConfirmed: (group: FriendFavoriteGroup) => void;
  onCanceled: () => void;
};

export function AssignToFavoriteDialog({ onConfirmed, onCanceled }: AssignToFavoriteDialogProps): ReactElement {
  const messages = useMessages().AssignToFavoriteDialog;
  const ref = useRef<HTMLSelectElement>(null);
  const userInfo = useSelector(selectUserInfo);
  const options = useMemo(() => {
    if (isLoaded(userInfo)) {
      const friendGroupNames = getFavoriteGroupNames(userInfo.friendGroupNames);
      console.log(friendGroupNames);
      return friendGroupNames.map((g, i) => (
        <option key={`${g}-${i}`} value={FriendFavoriteGroups[i]}>
          {g}
        </option>
      ));
    }
    return [];
  }, [userInfo]);

  const handleOnConfirm = useCallback(() => {
    if (ref.current) {
      onConfirmed(ref.current.value as FriendFavoriteGroup);
    }
    onCanceled();
  }, [onCanceled, onConfirmed]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <DialogHeader onCancel={onCanceled}>{messages.Header}</DialogHeader>
        <DialogContent className={styles.Content}>
          {messages.Content} <select ref={ref}>{options}</select>
        </DialogContent>
        <DialogFooter className={styles.Footer}>
          <Button onClick={onCanceled}>{messages.Footer.Cancel}</Button>
          <Button onClick={handleOnConfirm} active>
            {messages.Footer.Confirm}
          </Button>
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
