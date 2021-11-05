import React, { ChangeEventHandler, ReactElement, useCallback, useMemo } from 'react';
import styles from './DropDown.module.scss';

export type DropDownOptionItem = {
  value: string | number;
  label: string;
};

type ChangeHandler<T extends string | number> = (value: T) => void;

type DropDownProps<T extends string | number> = {
  options: DropDownOptionItem[];
  onChange: ChangeHandler<T>;
  value: T;
};

export function DropDown<T extends string | number>({ options, onChange, value }: DropDownProps<T>): ReactElement {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      onChange(e.target.value as T);
    },
    [onChange],
  );
  const renderedOptions = useMemo(() => {
    return options.map((o) => (
      <option key={`${o.value}-${o.label}`} value={o.value}>
        {o.label}
      </option>
    ));
  }, [options]);
  return (
    <div className={styles.DropDown}>
      <select onChange={handleChange} value={value}>
        {renderedOptions}
      </select>
    </div>
  );
}
