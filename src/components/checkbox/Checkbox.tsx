import classNames from 'classnames';
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
    <div className={styles.Component}>
      <div onClick={handleClick} className={styles.Switch}>
        <span className={classNames(styles.Slider, { [styles.Checked]: checked })} />
      </div>
      {label}
    </div>
  );
}
