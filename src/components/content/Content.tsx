import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import styles from './Content.module.scss';

type ContentProps = {
  className?: string;
  style?: CSSProperties;
};

export function Content({ children, className, style }: PropsWithChildren<ContentProps>): ReactElement {
  const classes = classNames(styles.Component, className);
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
