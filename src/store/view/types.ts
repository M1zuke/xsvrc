import { Action } from 'redux';

export type ViewActionTypes = `view/${'update-available'}`;

export type ViewAction<T extends ViewActionTypes> = Action<T>;

export type UpdateAvailable = ViewAction<'view/update-available'>;

export type ViewActions = UpdateAvailable;
