import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './Grid.module.scss';

type GridProps = {
  columns: number;
  rows?: number;
};

export function Grid({ columns, rows, children }: PropsWithChildren<GridProps>): ReactElement {
  const childrenCount = useMemo(() => React.Children.count(children), [children]);
  const calculatedRows = useMemo(() => Math.ceil(childrenCount / columns), [childrenCount, columns]);

  const style = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows || calculatedRows}, minmax(min-content, max-content))`,
    }),
    [calculatedRows, columns, rows],
  );

  return (
    <div className={styles.Component} style={style}>
      {children}
    </div>
  );
}
