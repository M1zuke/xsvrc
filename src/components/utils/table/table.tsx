import React, { FC } from 'react';

import './table.scss';
import { TextInput } from '../inputs/textInput';
import { TableButton } from '../buttons/tableButton';

interface TableProps {
  config: TableConfig;
}

export interface TableConfig {
  header: string[];
  data: TableValue[];
}

interface TableAction {
  value: any;
  onclick: () => void;
}

export interface TableValue {
  name: string;
  value: string | undefined;
  separate?: boolean;
  actions: TableAction[];
}

export const Table: FC<TableProps> = (props: TableProps) => {

  const theadBody = props.config.header.map((value: string, i: number) => {
    return <th key={ i + 'header' }>{ value }</th>;
  });

  const tHeader = () => {
    return (
        props.config.header.length === 0 ? <></> : (
            <thead key="tableHeader">
              <tr>
                { theadBody }
              </tr>
            </thead>
        )
    );
  };

  const renderTableActions = (actions: TableAction[]) => {
    return actions.map((action: TableAction, i: number) => {
      return (
          <TableButton key={ i + 'tableButton' } value={ action.value } onclick={ action.onclick } />
      );
    });
  };

  const tableBody = props.config.data.map((value: TableValue, i: number) => {
    return (
        <React.Fragment key={ i }>
          <tr>
            <td className="row-name">{ value.name }</td>
            <td>
              <div className="align-items">
                <TextInput value={ value.value } readonly />
                { renderTableActions(value.actions) }
              </div>
            </td>
          </tr>
          { value.separate ? (
              <tr key={ i + 'separator' } className="separate-row">
                <td />
                <td />
              </tr>
          ) : <></> }
        </React.Fragment>
    );
  });

  return (
      <div className="table-component">
        <table>
          { tHeader() }
          <tbody>
            { tableBody }
          </tbody>
        </table>
      </div>
  );
};
