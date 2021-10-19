import { useSelector } from 'react-redux';
import { isLoggedIn } from '../store/user/selectors';

export function useLoggedIn(): boolean {
  return useSelector(isLoggedIn);
}
