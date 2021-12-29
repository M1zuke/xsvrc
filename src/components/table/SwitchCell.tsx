import React, { ReactElement } from 'react';
import { DropDownCell } from './fields/DropDownCell';
import { TextCell } from './fields/TextCell';
import { CellOptions } from './Table';

type SwitchCellProps = {
  options: CellOptions;
};

export function SwitchCell({ options }: SwitchCellProps): ReactElement {
  switch (options.type) {
    case 'dropdown':
      return <DropDownCell {...options} />;
    default:
    case 'text':
      return <TextCell {...options} />;
  }
}
