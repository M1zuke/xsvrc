import { isEqual } from 'lodash';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { AvatarInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { Button } from '../../components/button/Button';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { Modal } from '../../components/modal/Modal';
import { Table } from '../../components/table/Table';
import { useMessages } from '../../i18n';
import { Dialog } from './Dialog';
import { DialogContent } from './dialog-content/DialogContent';
import { DialogFooter } from './dialog-footer/DialogFooter';
import { DialogHeader } from './dialog-header/DialogHeader';
import styles from './EditAvatarDialog.module.scss';
import { useEditAvatarTableModel } from './use-edit-avatar-table-model';

type EditAvatarDialogProps = {
  avatarInfo: AvatarInfo;
  onCanceled: () => void;
};

export function EditAvatarDialog({ onCanceled, avatarInfo }: EditAvatarDialogProps): ReactElement {
  const messages = useMessages().EditAvatarDialog;
  const initialValue = useRef(avatarInfo);
  const [changeVersion, setChangeVersion] = useState(true);
  const [ai, setAi] = useState<AvatarInfo>(avatarInfo);
  const [saving, setSaving] = useState(false);
  const tableModel = useEditAvatarTableModel(ai, (avatarInfo) => setAi(avatarInfo));
  const { updateAvatar, getAvatar } = useApi();

  const handleConfirm = useCallback(() => {
    setSaving(true);
    updateAvatar(ai, changeVersion).finally(() => onCanceled());
  }, [ai, changeVersion, onCanceled, updateAvatar]);

  useEffect(() => {
    if (!isEqual(avatarInfo, initialValue.current)) {
      setAi(avatarInfo);
    }
  }, [avatarInfo]);

  useEffect(() => {
    getAvatar(avatarInfo.id).finally();
  }, [avatarInfo.id, getAvatar]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <DialogHeader onCancel={onCanceled}>Edit Avatar - {avatarInfo.name}</DialogHeader>
        <DialogContent className={styles.Content}>
          <Table config={tableModel} />
          <Checkbox onChange={setChangeVersion} value={changeVersion} label="Push version on save" />
        </DialogContent>
        <DialogFooter className={styles.Footer}>
          <Button onClick={onCanceled}>{messages.Cancel}</Button>
          <Button onClick={handleConfirm} active disabled={saving}>
            {saving ? 'Loading...' : messages.Save}
          </Button>
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
