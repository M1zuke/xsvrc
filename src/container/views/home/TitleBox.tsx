import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './TitleBox.module.scss';

type TitleBoxProps = {
  title?: string;
  className?: string;
};

export function TitleBox({ title, children, className }: PropsWithChildren<TitleBoxProps>): ReactElement {
  const classes = classNames(styles.Content, className);
  return (
    <div className={classNames(styles.Component)}>
      {title ? (
        <div
          className={classNames(styles.Title, {
            [styles.AddMargin]: children,
          })}
        >
          {title}
        </div>
      ) : (
        <></>
      )}
      {children !== undefined && <div className={classes}>{children}</div>}
    </div>
  );
}
