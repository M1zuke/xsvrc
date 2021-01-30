import classNames from 'classnames';
import React, { ReactElement } from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  small?: boolean;
}

export function Loading(props: LoadingProps): ReactElement {
  const classes: string = classNames(styles.LoadingComponent, { [styles.Small]: props.small });
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
