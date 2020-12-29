import React, { CSSProperties, PropsWithChildren, ReactElement, useMemo } from 'react';
import styles from './ScrollableContent.module.scss';
import classNames from 'classnames';

type ScrollableContentProps = {
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
};

export function ScrollableContent({
  children,
  className,
  style,
  innerClassName,
}: PropsWithChildren<ScrollableContentProps>): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, className), [className]);
  const innerClasses = useMemo(() => classNames(styles.ScrollableContent, innerClassName), [innerClassName]);
  return (
    <div className={classes}>
      <div className={innerClasses} style={style}>
        {children}
      </div>
    </div>
  );
}
