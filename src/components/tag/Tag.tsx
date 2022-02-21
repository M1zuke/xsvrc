import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './Tag.module.scss';

type TagProps = {
  label: string;
  checked?: boolean;
  translucent?: boolean;
  fullWidth?: boolean;
  childrenClassName?: string;
};

export function Tag({
  label,
  checked,
  children,
  translucent,
  fullWidth,
  childrenClassName,
}: PropsWithChildren<TagProps>): ReactElement {
  return (
    <div className={classNames(styles.Tag, { [styles.FullWidth]: fullWidth })}>
      <div className={styles.Label}>{label}:</div>
      {typeof children === 'undefined' && (
        <div className={classNames(styles.Checked, { [styles.IsChecked]: checked })}>
          {checked ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </div>
      )}
      {!!children && (
        <div className={classNames(styles.Children, { [styles.Translucent]: translucent }, childrenClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}
