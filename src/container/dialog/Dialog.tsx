import React, { ForwardedRef, PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './Dialog.module.scss';

import classNames from 'classnames';

export type DialogWithProps<T> = T & {
  onCanceled: () => void;
  onConfirmed: () => void;
};

interface DialogProps {
  className?: string;
}

export function DialogComponent(
  props: PropsWithChildren<DialogProps>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, props.className), [props.className]);
  return (
    <div ref={ref} className={classes}>
      {props.children}
    </div>
  );
}

export const Dialog = React.forwardRef<HTMLDivElement, PropsWithChildren<DialogProps>>(DialogComponent);
