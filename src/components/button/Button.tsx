import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  'aria-label': string;
  // unset for default style
  theme?: 'light' | 'dark';
  active?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  mainClassName?: string;
}

export function Button(props: PropsWithChildren<ButtonProps>): ReactElement {
  const classes = useMemo(
    () =>
      classNames(
        style.StyleElement,
        {
          [style.Disabled]: props.disabled,
          [style.Active]: props.active,
        },
        props.className,
      ),
    [props.active, props.className, props.disabled],
  );
  const mainClasses = useMemo(
    () =>
      classNames(
        style.Component,
        {
          [style.FullWidth]: props.fullWidth,
          [style.Outline]: props.outline,
        },
        props.mainClassName,
      ),
    [props.fullWidth, props.mainClassName, props.outline],
  );
  return (
    <button aria-label={props['aria-label']} className={mainClasses} onClick={props.onClick} disabled={props.disabled}>
      <span className={classes}>{props.children}</span>
    </button>
  );
}
