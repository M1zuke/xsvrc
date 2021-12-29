import React, { ReactElement, useCallback } from 'react';
import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';
import { useMessages } from '../../i18n';
import styles from './ConfirmDialog.module.scss';
import { Dialog, DialogWithProps } from './Dialog';
import { DialogContent } from './dialog-content/DialogContent';
import { DialogFooter } from './dialog-footer/DialogFooter';
import { DialogHeader } from './dialog-header/DialogHeader';

export type ConfirmDialogProps = {
  title: string;
  body: string;
};

export function ConfirmDialog({
  onConfirmed,
  onCanceled,
  title,
  body = '',
}: DialogWithProps<ConfirmDialogProps>): ReactElement {
  const messages = useMessages().ConfirmDialog;
  const handleConfirm = useCallback(() => {
    onConfirmed();
    onCanceled();
  }, [onCanceled, onConfirmed]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <DialogHeader onCancel={onCanceled}>{title}</DialogHeader>
        <DialogContent>{body}</DialogContent>
        <DialogFooter className={styles.Footer}>
          <Button onClick={onCanceled}>{messages.Cancel}</Button>
          <Button onClick={handleConfirm} active>
            {messages.Confirm}
          </Button>
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
