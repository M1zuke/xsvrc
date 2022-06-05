import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement, useCallback } from 'react';
import { Button } from '../button/Button';
import styles from './fields/Cell.module.scss';
import tableStyles from './Table.module.scss';

type CellProps = {
  header?: boolean;
  collapseHandler?: () => void;
  allowCollapse?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
};

export function Cell({
  children,
  header,
  collapsed,
  collapseHandler,
  onClick,
}: PropsWithChildren<CellProps>): ReactElement {
  const handleOnClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      className={classNames(styles.Cell, {
        [tableStyles.Header]: header,
        [styles.CollapsableHandler]: collapseHandler,
        [styles.Clickable]: onClick,
      })}
      onClick={handleOnClick}
    >
      {children}
      {collapseHandler && (
        <Button icon onClick={collapseHandler}>
          {collapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Button>
      )}
    </div>
  );
}
