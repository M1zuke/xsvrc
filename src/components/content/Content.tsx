import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { useBlocked } from '../../common/use-blocked';
import { Loading } from '../loading/Loading';
import styles from './Content.module.scss';

type ContentProps = {
  className?: string;
  style?: CSSProperties;
  translucent?: boolean;
  noPadding?: boolean;
  blockable?: boolean;
};

export function Content({
  children,
  className,
  style,
  translucent,
  noPadding,
  blockable,
}: PropsWithChildren<ContentProps>): ReactElement {
  const [blocked] = useBlocked();

  const classes = classNames(
    styles.Component,
    { [styles.Translucent]: translucent, [styles.NoPadding]: noPadding, [styles.Blocked]: blocked },
    className,
  );
  return (
    <div className={classes} style={style}>
      {children}
      {blocked && blockable && (
        <div className={styles.BlockedOverlay}>
          <Loading logo={false} />
        </div>
      )}
    </div>
  );
}
