import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
  active?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  mainClassName?: string;
  icon?: boolean;
  headerIcon?: boolean;
  badge?: number;
  padding?: boolean;
  light?: boolean;
  dark?: boolean;
}

export function Button(props: PropsWithChildren<ButtonProps>): ReactElement {
  const badge = props.badge && props.badge >= 10 ? '9+' : props.badge;
  const classes = classNames(
    styles.StyleElement,
    {
      [styles.Disabled]: props.disabled,
      [styles.Active]: props.active,
      [styles.Icon]: props.icon,
      [styles.HeaderIcon]: props.headerIcon,
      [styles.Light]: props.light,
      [styles.Dark]: props.dark,
      [styles.Padding]: props.padding !== true,
    },
    props.className,
  );
  const mainClasses = classNames(
    styles.Component,
    {
      [styles.FullWidth]: props.fullWidth,
      [styles.Outline]: props.outline,
    },
    props.mainClassName,
  );
  return (
    <button aria-label={props['aria-label']} className={mainClasses} onClick={props.onClick} disabled={props.disabled}>
      {props.badge && props.badge > 0 ? <div className={styles.Badge}>{badge}</div> : <></>}
      <span className={classes}>{props.children}</span>
    </button>
  );
}
