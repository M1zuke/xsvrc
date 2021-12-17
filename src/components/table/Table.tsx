import classNames from 'classnames';
import React, { ReactElement, useMemo } from 'react';
import { TextCell } from './fields/TextCell';
import styles from './Table.module.scss';

type CellOptions = TextCellOptions;
export type TextCellOptions = {
  className?: string;
  value: string | number;
};

type RowOption = {
  id: string;
  values: CellOptions[];
};

export type TableConfig = {
  columns: { amount?: number; className?: string }[];
  header: RowOption;
  values: RowOption[];
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
  console.log(columnClassNames);

  const cells = useMemo(() => {
    return [config.header, ...config.values].flatMap((row, rowIndex) => {
      return row.values.map((cell, cellIndex) => {
        return (
          <TextCell
            key={`Table-${rowIndex}-${cellIndex}`}
            className={classNames(columnClassNames[cellIndex], { [styles.Header]: rowIndex === 0 }, cell.className)}
            value={cell.value}
          />
        );
      });
    });
  }, [columnClassNames, config.header, config.values]);

  const tableStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${columnClassNames.length}, auto)`,
    }),
    [columnClassNames.length],
  );

  return (
    <div className={styles.TableComponent} style={tableStyle}>
      {cells}
    </div>
  );
}
