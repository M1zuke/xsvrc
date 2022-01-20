import classNames from 'classnames';
import React, { ReactElement } from 'react';
import appLogo from '../../images/xsvrc-logo.png';
import styles from './Loading.module.scss';

interface LoadingProps {
  small?: boolean;
  logo?: boolean;
}

export function Loading({ small, logo = true }: LoadingProps): ReactElement {
  const classes: string = classNames(styles.LoadingComponent, { [styles.Small]: small });
  return (
    <div className={classes}>
      {logo && <img alt="" src={appLogo} />}
      <div className={styles.LdsEllipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
