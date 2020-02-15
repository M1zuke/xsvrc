import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';

import './backButton.scss';

export const BackButton: FC = () => {

  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className="back-btn-component" onClick={goBack}>
      <FontAwesomeIcon icon={faAngleLeft} size="3x" />
    </div>
  );
};
