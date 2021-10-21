import React, { PropsWithChildren, ReactElement, useCallback, useMemo, useState } from 'react';
import { Button } from '../button/Button';
import styles from './Tabs.module.scss';

type TabsProps = {
  title: string[];
};

export function Tabs({ title, children }: PropsWithChildren<TabsProps>): ReactElement {
  const childs = useMemo(() => React.Children.toArray(children), [children]);
  const [tabIndex, setIndex] = useState(0);

  const isActive = useCallback((i: number) => tabIndex === i, [tabIndex]);

  const tabs = useMemo(
    () =>
      title.map((title, index) => {
        return (
          <Button active={isActive(index)} key={`${title}-${index}`} onClick={() => setIndex(index)}>
            {title}
          </Button>
        );
      }),
    [isActive, title],
  );

  return (
    <div className={styles.Component}>
      <div className={styles.Tabs}>{tabs}</div>
      <div className={styles.Content}>{childs[tabIndex]}</div>
    </div>
  );
}