import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AuthenticatedUserInfo } from '../../api/types';
import { Login } from '../../container/views/login/Login';
import { savedCookies } from '../../store/persisted/selectors';
import { StoredCookie } from '../../store/persisted/state';
import { isErrorType, Loadable } from '../../store/reducer';
import { selectUserInfo } from '../../store/user/selectors';

export function isLoggedIn(cookies: StoredCookie[], userInfo: Loadable<AuthenticatedUserInfo>): boolean {
  const cookie = isProbablyAuthenticated(cookies);
  const userInfoNull = userInfo === null;
  const userInfoIsErrorType = isErrorType(userInfo);
  return cookie && !userInfoNull && !userInfoIsErrorType;
}

export function isProbablyAuthenticated(cookies: StoredCookie[]): boolean {
  return !!cookies.find((cookie) => cookie.key === 'auth');
}

export function Secured({
  children,
}: PropsWithChildren<{
  /* TODO: Add Child Only Props */
}>): ReactElement {
  const cookies = useSelector(savedCookies);
  const userInfo = useSelector(selectUserInfo);

  const isNotAuthenticated = useMemo(() => !isLoggedIn(cookies, userInfo), [cookies, userInfo]);

  if (isNotAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}
