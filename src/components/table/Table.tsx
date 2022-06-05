import React, { ReactElement, useMemo } from 'react';
import styles from './Table.module.scss';
import { TableRow } from './TableRow';

export type CellTypes = string | number;

export type CellOptions<T extends CellTypes = CellTypes> = TextCellOptions | DropDownOption<T> | CustomCellOption;
export type TextCellOptions = {
  type?: 'text';
  className?: string;
  value: string | number;
  editable?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export type CustomCellOption = {
  type: 'custom';
  className?: string;
  value: ReactElement;
};

export type DropDownOption<T extends CellTypes> = {
  type: 'dropdown';
  className?: string;
  value: T;
  onChange: (value: T) => string;
  options: DropDownOptionItem<T>[];
};

export type DropDownOptionItem<T extends CellTypes> = {
  value: T;
  label: string;
};

type RowGroupOption = {
  type: 'group';
  id: string;
  row: RowOption;
  subRows: RowOption[];
};

export type RowOption = {
  type: 'row';
  id: string;
  onClick?: () => void;
  values: CellOptions[];
};

export type RowConfig = RowGroupOption | RowOption;

export type TableConfig = {
  columns: { amount?: number; className?: string; width?: string }[];
  header?: RowOption;
  rows: RowConfig[];
};

type TableProps = {
  config: TableConfig;
};

export function Table({ config }: TableProps): ReactElement {
  const tableStyle = useMemo(() => {
    const columnWidths = config.columns.map((columnConfig) => {
      const columnConfigWidth = columnConfig.width;
      if (columnConfigWidth === 'autoSize') {
        return `repeat(${columnConfig.amount},minmax(min-content, max-content))`;
      }
      return `repeat(${columnConfig.amount}, 1fr)`;
    });

    return {
      gridTemplateColumns: columnWidths.join(' '),
    };
  }, [config.columns]);

  return (
    <div className={styles.TableComponent} style={tableStyle}>
      {config.header && (
        <div className={styles.Header}>
          <TableRow row={config.header} />
        </div>
      )}
      {config.rows.map((row) => (
        <TableRow key={`row-${row.id}`} row={row} />
      ))}
    </div>
  );
}
