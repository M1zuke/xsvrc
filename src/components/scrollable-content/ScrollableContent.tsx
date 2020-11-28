import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './ScrollableContent.module.scss';

export function ScrollableContent({ children }: PropsWithChildren<unknown>): ReactElement {
  return (
    <div className={styles.Component}>
      <div className={styles.ScrollableContent}>{children}</div>
    </div>
  );
}
