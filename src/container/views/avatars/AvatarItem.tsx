import { Delete, Edit, Lock } from '@mui/icons-material';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { AvatarInfo } from '../../../api/types';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { ConfirmDialog } from '../../dialog/ConfirmDialog';
import { EditAvatarDialog } from '../../dialog/EditAvatarDialog';
import styles from './AvatarItem.module.scss';

export type AvatarItemProps = {
  avatarInfo: AvatarInfo;
};

export function AvatarItem({ avatarInfo }: AvatarItemProps): ReactElement {
  const [showEditAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showConfirmDeleteAvatar, setShowConfirmDeleteAvatar] = useState(false);
  const { deleteAvatar } = useApi();
  const imageStyle = useMemo(
    () => ({
      backgroundImage: `url('${avatarInfo.thumbnailImageUrl}')`,
    }),
    [avatarInfo.thumbnailImageUrl],
  );

  const handleConfirmDelete = useCallback(() => {
    deleteAvatar(avatarInfo.id).finally();
  }, [avatarInfo.id, deleteAvatar]);

  return (
    <>
      {showConfirmDeleteAvatar && (
        <ConfirmDialog
          title="Delete avatar"
          body={`Delete avatar "${avatarInfo.name}"`}
          onCanceled={() => setShowConfirmDeleteAvatar(false)}
          onConfirmed={handleConfirmDelete}
        />
      )}
      {showEditAvatarDialog && (
        <EditAvatarDialog avatarInfo={avatarInfo} onCanceled={() => setShowAvatarDialog(false)} />
      )}
      <div className={styles.AvatarItem} style={imageStyle}>
        <div className={styles.BottomWrapper}>
          <div className={styles.Name}>{avatarInfo.name}</div>
          <Button icon onClick={() => setShowAvatarDialog(true)}>
            <Edit />
          </Button>
          <Button icon className={styles.DeleteButton} onClick={() => setShowConfirmDeleteAvatar(true)}>
            <Delete />
          </Button>
        </div>
        <div className={styles.Version}>Version: {avatarInfo.version}</div>
        {avatarInfo.releaseStatus === 'private' && (
          <div className={styles.Private}>
            <Lock className={styles.IconOverwrite} />
          </div>
        )}
      </div>
    </>
  );
}
