import React, { ReactElement, useMemo } from 'react';
import { Moderation } from '../../../../api/types';

type ModerationItemProps = {
  moderations: Moderation[];
};

export function ModerationItem({ moderations }: ModerationItemProps): ReactElement {
  const userInfo = useMemo(() => {
    return moderations[0];
  }, [moderations]);
  const allModerations = useMemo(() => {
    return moderations.map((m) => m.type).join(' - ');
  }, [moderations]);

  console.log(moderations);
  return <div>{`${userInfo.targetDisplayName} -> ${allModerations}`}</div>;
}
