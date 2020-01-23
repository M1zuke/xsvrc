import React, { FC } from 'react';

import './tableButton.scss';

interface TableButtonProps {
  value: any
  onclick: () => void;
}

export const TableButton: FC<TableButtonProps> = (props: TableButtonProps) => {
  return (
      <div className="table-button-component" onClick={ props.onclick }> { props.value } </div>
  );
};
