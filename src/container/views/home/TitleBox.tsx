import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './TitleBox.module.scss';

type TitleBoxProps = {
  title?: string;
};

export function TitleBox({ title, children }: PropsWithChildren<TitleBoxProps>): ReactElement {
  return (
    <div className={styles.Component}>
      {title ? <div className={styles.Title}>{title}</div> : <></>}
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
