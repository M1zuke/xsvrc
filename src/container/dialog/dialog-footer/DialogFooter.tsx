import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import classNames from 'classnames';
import styles from './DialogFooter.module.scss';

interface DialogFooterProps {
  className?: string;
}

export function DialogFooter(props: PropsWithChildren<DialogFooterProps>): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, props.className), [props.className]);
  return <div className={classes}>{props.children}</div>;
}
