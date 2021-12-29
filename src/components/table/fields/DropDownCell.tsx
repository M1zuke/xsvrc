import React, { ReactElement } from 'react';
import { DropDown } from '../../drop-down/DropDown';
import { CellTypes, DropDownOption } from '../Table';
import styles from './Cell.module.scss';

export function DropDownCell<T extends CellTypes>(props: DropDownOption<T>): ReactElement {
  return (
    <div className={styles.Cell}>
      <DropDown {...props} />
    </div>
  );
}
