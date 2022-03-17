import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../../../../api/types';
import { ScrollableContent } from '../../../../../components/scrollable-content/ScrollableContent';
import { selectUserHistory } from '../../../../../store/history/selectors';

type HistoryTabProps = {
  user: UserInfo;
};
export function HistoryTab({ user }: HistoryTabProps): ReactElement {
  const history = useSelector(selectUserHistory(user.id));

  const renderedHistory = useMemo(() => {
    return history.map((h, index) => {
      return <div key={`history-entry-${index}`}>{h}</div>;
    });
  }, [history]);

  return <ScrollableContent translucent>{renderedHistory}</ScrollableContent>;
}
