import { KeyboardArrowRight } from '@mui/icons-material';
import React, { ReactElement, useMemo } from 'react';
import { useSettings } from '../../../../common/use-settings';
import { MappedModeration } from '../../../../store/user/actions';
import styles from './ModerationItem.module.scss';

type ModerationItemProps = {
  moderation: MappedModeration;
};

function localizeDate(localization: string, use12hours: boolean, date: string): string {
  return Intl.DateTimeFormat(localization, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour12: use12hours,
  }).format(new Date(date));
}

export function ModerationItem({ moderation }: ModerationItemProps): ReactElement {
  const { settings } = useSettings();

  const allModerations = useMemo(() => {
    return moderation.moderations.map((m) => {
      return (
        <div key={`${m.targetDisplayName}-${m.type}`} className={styles.Moderation}>
          <div className={styles.TimeStamp}>{localizeDate(settings.localization, settings.use12hours, m.created)}</div>
          <KeyboardArrowRight />
          <div className={styles.TimeStamp}>{m.type}</div>
        </div>
      );
    });
  }, [moderation.moderations, settings.localization, settings.use12hours]);

  return (
    <div className={styles.ModerationItem}>
      <div className={styles.Header}>
        <div className={styles.TimeStamp}>
          {localizeDate(settings.localization, settings.use12hours, moderation.created)}
        </div>
        <div className={styles.TargetName}>{moderation.displayName}</div>
      </div>
      <div className={styles.Moderations}>{allModerations}</div>
    </div>
  );
}
