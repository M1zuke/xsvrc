import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import styles from './Content.module.scss';

type ContentProps = {
  className?: string;
  style?: CSSProperties;
  translucent?: boolean;
};

export function Content({ children, className, style, translucent }: PropsWithChildren<ContentProps>): ReactElement {
  const classes = classNames(styles.Component, { [styles.Translucent]: translucent }, className);
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
