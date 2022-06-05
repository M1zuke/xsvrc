import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { AppActions } from '../store/actions';

export type AppDispatch = ThunkDispatch<AppState, undefined, AppActions>;
export type AppThunkAction<R = void> = ThunkAction<R, AppState, undefined, AppActions>;
export type AsyncAppAction<R = void> = AppThunkAction<Promise<R>>;

export type BoundThunkAction<T> = T extends (...args: infer A) => AppThunkAction<infer R> ? (...args: A) => R : T;
