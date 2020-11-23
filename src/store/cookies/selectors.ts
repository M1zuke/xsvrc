import { AppState } from '../index';
import { StoredCookie } from './state';

export const savedCookies = (state: AppState): StoredCookie[] => state.cookies;
