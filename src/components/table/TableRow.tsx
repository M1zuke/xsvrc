import classNames from 'classnames';
import React, { ReactElement, useMemo, useState } from 'react';
import { ContentRow } from './ContentRow';
import { RowConfig } from './Table';
import styles from './Table.module.scss';

type TableRowProps = {
  row: RowConfig;
};

export function TableRow({ row }: TableRowProps): ReactElement {
  const isCollapsible = row.type === 'group';
  const [collapsed, setCollapsed] = useState(isCollapsible ? true : undefined);

  const toggle = useMemo(
    () => (isCollapsible ? () => setCollapsed((current) => !current) : undefined),
    [isCollapsible],
  );

  switch (row.type) {
    case 'group': {
      return (
        <div className={classNames(styles.SubTable, { [styles.Collapsed]: collapsed && isCollapsible })}>
          <ContentRow row={row.row} collapsed={collapsed} toggle={toggle}></ContentRow>
          {row.subRows.map((sub) => (
            <ContentRow key={`table-sub-content-row-${row.id}`} row={sub} collapsed={collapsed}></ContentRow>
          ))}
        </div>
      );
    }
    default:
    case 'row':
      return <ContentRow row={row} />;
  }
}
