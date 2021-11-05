import { Action } from 'redux';
import { Messages } from '../../i18n/Messages';

export type ViewActionTypes = `view/${'update-available' | 'set-i18n'}`;

export type ViewAction<T extends ViewActionTypes> = Action<T>;

export type UpdateAvailable = ViewAction<'view/update-available'>;
export type SetI18N = ViewAction<'view/set-i18n'> & {
  i18n: Messages;
};

export type ViewActions = UpdateAvailable | SetI18N;
