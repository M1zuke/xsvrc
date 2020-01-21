import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../store/user/selectors';
import { useHistory } from 'react-router';

interface SaveGuardProps {
  children: ReactNode;
}

export const SaveGuard: FC<SaveGuardProps> = (props: SaveGuardProps) => {
  const loggedIn: boolean = useSelector(selectLoggedIn);
  const history = useHistory();

  if (!loggedIn) {
    history.push('/');
  }
  return (<> { props.children } </>);
};
