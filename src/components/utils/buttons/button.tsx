import React, { FC, ReactNode } from 'react';
import './button.scss';


interface ButtonProps {
  children: ReactNode;
  onclick: () => void;
  theme?: 'highlight' | 'dark';
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
      <div className={ `button-component ${ props.theme ? props.theme : 'highlight' }` } onClick={ props.onclick }>
        { props.children }
      </div>
  );
};
