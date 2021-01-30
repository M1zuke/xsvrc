import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import styles from './ScrollableContent.module.scss';

type ScrollableContentProps = {
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  translucent?: boolean;
};

export function ScrollableContent({
  children,
  className,
  style,
  innerClassName,
  translucent,
}: PropsWithChildren<ScrollableContentProps>): ReactElement {
  const classes = classNames(styles.Component, { [styles.Translucent]: translucent }, className);
  const innerClasses = classNames(styles.ScrollableContent, innerClassName);
  return (
    <div className={classes}>
      <div className={innerClasses} style={style}>
        {children}
      </div>
    </div>
  );
}
