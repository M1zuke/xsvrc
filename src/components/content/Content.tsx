import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './Content.module.scss';
import classNames from 'classnames';

type ContentProps = {
  noScroll?: boolean;
  className?: string;
};

export function Content({ noScroll, children, className }: PropsWithChildren<ContentProps>): ReactElement {
  const classes = classNames(styles.Component, { [styles.NoScroll]: noScroll }, className);
  return <div className={classes}>{children}</div>;
}
