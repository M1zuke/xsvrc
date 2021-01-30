import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import styles from './ToolTip.module.scss';

type ToolTipProps = {
  toolTip?: string;
  className?: string;
};

export function ToolTip({ toolTip, className, children }: PropsWithChildren<ToolTipProps>): ReactElement {
  const classes = classNames(styles.ToolTipWrapper, className);
  const [leftOrRight, setLeftOrRight] = useState<'left' | 'right'>('left');
  const toolTipClasses = classNames(styles.ToolTip, {
    [styles.Left]: leftOrRight === 'left',
    [styles.Right]: leftOrRight === 'right',
  });

  const mouseEnter = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const windowSize = window.innerWidth;
    const calculatedEntPosOfToolTip = windowSize - evt.pageX - 200;
    calculatedEntPosOfToolTip <= 0 ? setLeftOrRight('left') : setLeftOrRight('right');
  }, []);
  return (
    <div className={classes} onMouseEnter={mouseEnter}>
      {toolTip && <div className={toolTipClasses}>{toolTip}</div>}
      {children}
    </div>
  );
}
