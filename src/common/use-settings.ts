import { useSelector } from 'react-redux';
import { selectSettings } from '../store/persisted/selectors';
import { Settings } from '../store/persisted/state';

export function useSettings(): Settings {
  return useSelector(selectSettings);
}
