import { AuthenticatedUserInfo, UserInfo } from '../api/types';

export function isOnline(userInfo: UserInfo | AuthenticatedUserInfo): boolean {
  return (userInfo.location && userInfo.location !== 'offline') || userInfo.state === 'online';
}

export function isActive(userInfo: UserInfo | AuthenticatedUserInfo): boolean {
  return userInfo.location === '' || userInfo.state === 'active';
}

export function isLoggedIn(userInfo: UserInfo | AuthenticatedUserInfo): boolean {
  return isOnline(userInfo) || isActive(userInfo);
}

export function isOffline(userInfo: UserInfo | AuthenticatedUserInfo): boolean {
  return !isOnline(userInfo) && !isActive(userInfo);
}
