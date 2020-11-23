import React, { ReactElement, useMemo } from 'react';
import styles from './Loading.module.scss';
import classNames from 'classnames';

interface LoadingProps {
  small?: boolean;
}

export function Loading(props: LoadingProps): ReactElement {
  const classes: string = useMemo(() => classNames(styles.LoadingComponent, { [styles.Small]: props.small }), [
    props.small,
  ]);
  return (
    <div className={classes}>
      <div className={styles.LdsEllipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
