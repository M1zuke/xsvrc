import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './ScrollableContent.module.scss';
import classNames from 'classnames';

type ScrollableContentProps = {
  className?: string;
};

export function ScrollableContent({ children, className }: PropsWithChildren<ScrollableContentProps>): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, className), [className]);
  return (
    <div className={classes}>
      <div className={styles.ScrollableContent}>{children}</div>
    </div>
  );
}
