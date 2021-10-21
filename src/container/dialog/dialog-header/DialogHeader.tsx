import { Close } from '@mui/icons-material';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import { Button } from '../../../components/button/Button';
import styles from './DialogHeader.module.scss';

type DialogHeaderProps = {
  className?: string;
  onCancel: () => void;
};

export function DialogHeader({ onCancel, className, children }: PropsWithChildren<DialogHeaderProps>): ReactElement {
  const classes = useMemo(() => classNames(styles.Component, className), [className]);
  return (
    <div className={classes}>
      {children}
      <Button onClick={onCancel} icon>
        <Close />
      </Button>
    </div>
  );
}
