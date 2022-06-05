import React, { ReactElement } from 'react';
import { Cell } from './Cell';
import { DropDownCell } from './fields/DropDownCell';
import { TextCell } from './fields/TextCell';
import { CellOptions } from './Table';

export type TableHeaderProps<T> = T & {
  header?: boolean;
};

type SwitchCellProps = {
  header?: boolean;
  collapseHandler?: () => void;
  collapsed?: boolean;
  allowCollapse?: boolean;
  options: CellOptions;
  onClick?: () => void;
};

export function SwitchCell({ options, ...props }: SwitchCellProps): ReactElement {
  switch (options.type) {
    case 'dropdown':
      return (
        <Cell {...props}>
          <DropDownCell {...options} />
        </Cell>
      );
    case 'custom':
      return <Cell {...props}>{options.value}</Cell>;
    default:
    case 'text':
      return (
        <Cell {...props}>
          <TextCell {...options} />
        </Cell>
      );
  }
}
