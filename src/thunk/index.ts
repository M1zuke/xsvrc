import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { AppActions } from '../store/actions';

export type AppDispatch = ThunkDispatch<AppState, undefined, AppActions>;
export type AppThunkAction<R = void> = ThunkAction<Promise<R>, AppState, undefined, AppActions>;
