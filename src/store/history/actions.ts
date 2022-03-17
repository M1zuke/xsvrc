import { UserInfo } from '../../api/types';
import { AddHistory } from './types';

export function addHistory(
  userId: UserInfo['id'],
  oldLocation: UserInfo['location'],
  newLocation: UserInfo['location'],
): AddHistory {
  return {
    type: 'history/add-history',
    userId,
    oldLocation,
    newLocation,
  };
}
