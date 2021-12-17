import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { TextCellOptions } from '../Table';
import styles from './Cell.module.scss';

export function TextCell({ value, className }: TextCellOptions): ReactElement {
  return <div className={classNames(styles.Cell, className)}>{value}</div>;
}
