import React, { FC } from 'react';

import './loading.scss';

export const Loading: FC = () => {
  return (
      <div className="lds-ring">
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
  );
};
