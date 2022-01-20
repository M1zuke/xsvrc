import React, { ChangeEvent, ReactElement, useCallback } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
};

export function TextInput({ value, onChange, type = 'text', placeholder }: TextInputProps): ReactElement {
  const handleOnInput = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange]);
  return (
    <input
      className={styles.Component}
      type={type}
      defaultValue={value}
      onInput={handleOnInput}
      placeholder={placeholder}
    />
  );
}
