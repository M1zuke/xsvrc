import React, { ReactElement } from 'react';
import { DropDown } from '../../drop-down/DropDown';
import { TableHeaderProps } from '../SwitchCell';
import { CellTypes, DropDownOption } from '../Table';

export function DropDownCell<T extends CellTypes>({
  header,
  ...props
}: TableHeaderProps<DropDownOption<T>>): ReactElement {
  return <DropDown {...props} />;
}
