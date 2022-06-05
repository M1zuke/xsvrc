import React, { ReactElement } from 'react';
import { SwitchCell } from './SwitchCell';
import { RowOption } from './Table';
import styles from './Table.module.scss';

type ContentRowProps = {
  row: RowOption;
  collapsed?: boolean;
  toggle?: () => void;
};

export function ContentRow({ row, toggle, collapsed }: ContentRowProps): ReactElement {
  return (
    <div className={styles.ContentRow}>
      {row.values.map((v, index) => (
        <SwitchCell
          onClick={row.onClick}
          key={`table-${row.id}-cell-${index}`}
          options={v}
          collapsed={collapsed}
          collapseHandler={row.values.length - 1 === index ? toggle : undefined}
        />
      ))}
    </div>
  );
}
