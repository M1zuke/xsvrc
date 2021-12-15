import React, { ReactElement, useMemo } from 'react';
import { Moderation } from '../../../../api/types';
import { useSettings } from '../../../../common/use-settings';
import styles from './ModerationItem.module.scss';

type ModerationItemProps = {
  moderations: Moderation[];
};

export function ModerationItem({ moderations }: ModerationItemProps): ReactElement {
  const { settings } = useSettings();

  const moderation = useMemo(() => {
    return moderations[0];
  }, [moderations]);

  const allModerations = useMemo(() => {
    return moderations.map((m) => {
      const timestamp = Intl.DateTimeFormat(settings.localization, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour12: settings.use12hours,
      }).format(new Date(m.created));
      return (
        <div key={`${m.targetDisplayName}-${m.type}`} className={styles.Moderation}>
          <div className={styles.TimeStamp}>{timestamp}</div>
          {m.type}
        </div>
      );
    });
  }, [moderations, settings.localization, settings.use12hours]);

  return (
    <div className={styles.ModerationItem}>
      <div className={styles.Header}>
        <div className={styles.TargetName}>{moderation.targetDisplayName}</div>
      </div>
      <div className={styles.Moderations}>{allModerations}</div>
    </div>
  );
}
