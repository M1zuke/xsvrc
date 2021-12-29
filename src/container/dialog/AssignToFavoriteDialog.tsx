import React, { ReactElement, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';
import { useMessages } from '../../i18n';
import { GetFavoriteGroups } from '../../store/user/selectors';
import styles from './AssignToFavoriteDialog.module.scss';
import { Dialog } from './Dialog';
import { DialogContent } from './dialog-content/DialogContent';
import { DialogFooter } from './dialog-footer/DialogFooter';
import { DialogHeader } from './dialog-header/DialogHeader';

type AssignToFavoriteDialogProps = {
  onConfirmed: (group: string) => void;
  onCanceled: () => void;
};

export function AssignToFavoriteDialog({ onConfirmed, onCanceled }: AssignToFavoriteDialogProps): ReactElement {
  const messages = useMessages().AssignToFavoriteDialog;
  const ref = useRef<HTMLSelectElement>(null);
  const favoriteGroupNames = useSelector(GetFavoriteGroups('friend'));

  const options = useMemo(() => {
    return favoriteGroupNames.map((g, i) => (
      <option key={`${g.name}-${i}`} value={g.name}>
        {g.displayName}
      </option>
    ));
  }, [favoriteGroupNames]);

  const handleOnConfirm = useCallback(() => {
    ref.current && onConfirmed(ref.current.value);
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
