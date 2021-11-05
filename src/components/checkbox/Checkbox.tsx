import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import React, { ReactElement, useCallback, useState } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
  label?: string;
  onChange: (value: boolean) => void;
  value?: boolean;
};

export function Checkbox({ label, onChange, value }: CheckboxProps): ReactElement {
  const [checked, setChecked] = useState(value || false);
  const handleClick = useCallback(() => {
    const newChecked = !checked;
    onChange(newChecked);
    setChecked(newChecked);
  }, [checked, onChange]);

  return (
    <div onClick={handleClick} className={styles.Component}>
      {checked && <CheckBox />}
      {!checked && <CheckBoxOutlineBlank />}
      {label}
    </div>
  );
}
