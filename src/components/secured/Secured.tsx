import React, { PropsWithChildren, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Login } from '../../container/views/login/Login';
import { StoredCookie } from '../../store/persisted/state';
import { isLoggedIn, isLoggingIn } from '../../store/user/selectors';
import { Loading } from '../loading/Loading';

export function isProbablyAuthenticated(cookies: StoredCookie[]): boolean {
  return !!cookies.find((cookie) => cookie.key === 'auth');
}

export function Secured({
  children,
}: PropsWithChildren<{
  /* TODO: Add Child Only Props */
}>): ReactElement {
  const isNotAuthenticated = useSelector(isLoggedIn);
  const loggingIn = useSelector(isLoggingIn);

  if (loggingIn) {
    return <Loading />;
  }

  if (!isNotAuthenticated && !loggingIn) {
    return <Login />;
  }

  return <>{children}</>;
}
