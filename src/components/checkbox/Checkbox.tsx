import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import React, { ReactElement, useCallback, useState } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  label: string;
  onClick: (value: boolean) => void;
  value?: boolean;
};
export function Checkbox({ label, onClick, value }: CheckboxProps): ReactElement {
  const [checked, setChecked] = useState(value || false);
  const handleClick = useCallback(() => {
    const newChecked = !checked;
    onClick(newChecked);
    setChecked(newChecked);
  }, [checked, onClick]);

  return (
    <div onClick={handleClick} className={styles.Component}>
      {checked && <CheckBox />}
      {!checked && <CheckBoxOutlineBlank />}
      {label}
    </div>
  );
}
