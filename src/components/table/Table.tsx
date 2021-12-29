import classNames from 'classnames';
import React, { ReactElement, useMemo } from 'react';
import { SwitchCell } from './SwitchCell';
import styles from './Table.module.scss';

export type CellTypes = string | number;

export type CellOptions<T extends CellTypes = CellTypes> = TextCellOptions | DropDownOption<T>;
export type TextCellOptions = {
  type?: 'text';
  className?: string;
  value: string | number;
  editable?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
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

export type RowOption = {
  id: string;
  values: CellOptions[];
};

export type TableConfig = {
  columns: { amount?: number; className?: string }[];
  header?: RowOption;
  rows: RowOption[];
};

type TableProps = {
  config: TableConfig;
};

export function Table({ config }: TableProps): ReactElement {
  const columnClassNames = useMemo(() => {
    return config.columns.flatMap((column) => {
      return new Array(column.amount ?? 1).fill('').map(() => column.className);
    });
  }, [config.columns]);

  const cells = useMemo(() => {
    return (config.header ? [config?.header, ...config.rows] : config.rows).flatMap((row, rowIndex) => {
      return row.values.map((cell, cellIndex) => {
        const newOptions: CellOptions = {
          ...cell,
          className: classNames(
            columnClassNames[cellIndex],
            { [styles.Header]: rowIndex === 0 && config.header },
            cell.className,
          ),
        };
        return <SwitchCell key={`Table-${rowIndex}-${cellIndex}`} options={newOptions} />;
      });
    });
  }, [columnClassNames, config.header, config.rows]);

  const tableStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${columnClassNames.length}, minmax(min-content, auto)`,
    }),
    [columnClassNames.length],
  );

  return (
    <div className={styles.TableComponent} style={tableStyle}>
      {cells}
    </div>
  );
}
