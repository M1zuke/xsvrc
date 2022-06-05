import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setBlocked } from '../store/view/actions';
import { GetBlocked } from '../store/view/selectors';
import { useAppDispatch } from '../thunk/dispatch';

export function useBlocked(): [boolean, (value: boolean) => void] {
  const dispatch = useAppDispatch();
  const blocked = useSelector(GetBlocked);

  const changeBlocked = useCallback(
    (value: boolean) => {
      dispatch(setBlocked(value));
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      if (blocked) {
        dispatch(setBlocked(false));
      }
    };
  }, [blocked, dispatch]);

  return [blocked, changeBlocked];
}
