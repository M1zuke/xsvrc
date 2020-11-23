import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { Messages } from './Messages';

export function useMessages(): Messages {
  return useSelector<AppState, Messages>((state) => state.view.i18n);
}
