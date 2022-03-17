import { KeyboardArrowRight } from '@mui/icons-material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useSettings } from '../../../../common/use-settings';
import { useMessages } from '../../../../i18n';
import { MappedModeration } from '../../../../store/user/selectors';
import { setModal } from '../../../../store/view/actions';
import { useAppDispatch } from '../../../../thunk/dispatch';
import styles from './ModerationItem.module.scss';

type ModerationItemProps = {
  moderation: MappedModeration;
};

export function ModerationItem({ moderation }: ModerationItemProps): ReactElement {
  const { settings } = useSettings();
  const dispatch = useAppDispatch();
  const messages = useMessages();
  const Format = messages.Format.FullDate(settings);

  const allModerations = useMemo(() => {
    return moderation.moderations.map((m) => {
      return (
        <div key={`${m.targetDisplayName}-${m.type}`} className={styles.Moderation}>
          <div className={styles.TimeStamp}>{Format(m.created)}</div>
          <KeyboardArrowRight />
          <div className={styles.TimeStamp}>{m.type}</div>
        </div>
      );
    });
  }, [Format, moderation.moderations]);

  const routeToUser = useCallback(() => {
    dispatch(
      setModal({
        type: 'friend-profile',
        userId: moderation.targetUserId,
      }),
    );
  }, [dispatch, moderation.targetUserId]);

  return (
    <div className={styles.ModerationItem}>
      <div className={styles.Header}>
        <div className={styles.TimeStamp}>{Format(moderation.created)}</div>
        <div className={styles.TargetName} onClick={routeToUser}>
          {moderation.displayName}
        </div>
      </div>
      <div className={styles.Moderations}>{allModerations}</div>
    </div>
  );
}
