import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './DialogContent.module.scss';

import classNames from 'classnames';

interface DialogContentProps {
  className?: string;
}

export function DialogContent(props: PropsWithChildren<DialogContentProps>): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, props.className), [props.className]);
  return <div className={classes}>{props.children}</div>;
}
