import { Action } from 'redux';
import { UserInfo } from '../../api/types';

export type HistoryActionTypes = `history/${'add-history'}`;

export type HistoryAction<T extends HistoryActionTypes> = Action<T>;

export type AddHistory = HistoryAction<'history/add-history'> & {
  userId: UserInfo['id'];
  oldLocation: UserInfo['location'];
  newLocation: UserInfo['location'];
};

export type HistoryActions = AddHistory;
