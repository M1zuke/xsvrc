import classNames from 'classnames';
import React, { ChangeEvent, ReactElement, useCallback } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  disabled?: boolean;
};

export function TextInput({ value, onChange, type = 'text', placeholder, disabled }: TextInputProps): ReactElement {
  const handleOnInput = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange]);
  return (
    <input
      className={classNames(styles.Component, { [styles.Disabled]: disabled })}
      type={type}
      defaultValue={value}
      onInput={handleOnInput}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
