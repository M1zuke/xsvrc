import React, { ChangeEvent, ReactElement, useCallback } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
  ['aria-label']: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
};

export function TextInput({ value, onChange, type = 'text', placeholder, ...props }: TextInputProps): ReactElement {
  const handleOnInput = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange]);
  return (
    <input
      aria-label={props['aria-label']}
      className={styles.Component}
      type={type}
      defaultValue={value}
      onInput={handleOnInput}
      placeholder={placeholder}
    />
  );
}
