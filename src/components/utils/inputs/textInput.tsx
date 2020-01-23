import React, { ChangeEvent, FC } from 'react';
import './textInput.scss';

interface TextInputProps {
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'password' | 'text';
  value?: string;
  readonly?: boolean;
}

export const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  return (
      <div className="text-input-component">
        <input className={ props.readonly ? 'readonly' : '' }
               type={ props.type ? props.type : 'text' }
               onChange={ props.onchange }
               placeholder={ props.placeholder }
               value={ props.value }
               readOnly={ props.readonly } />
      </div>
  );
};
