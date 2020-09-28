import { useDispatch } from 'react-redux';
import { AppDispatch } from './index';

export function useAppDispatch(): AppDispatch {
  return useDispatch() as AppDispatch;
}
