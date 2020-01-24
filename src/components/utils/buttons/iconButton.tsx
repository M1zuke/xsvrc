import React, { FC } from 'react';

import './iconButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface TableButtonProps {
  value: IconProp;
  onclick: () => void;
  rounded?: boolean;
}

export const IconButton: FC<TableButtonProps> = (props: TableButtonProps) => {
  return (
      <div className={ `icon-button-component ${ props.rounded ? 'rounded' : '' }` } onClick={ props.onclick }>
        <FontAwesomeIcon icon={ props.value } size="lg" />
      </div>
  );
};
