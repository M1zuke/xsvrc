import { useEffect } from 'react';
import { useIpcRenderer } from '../common/electron-controls';
import { updateAvailable } from '../store/view/actions';
import { useAppDispatch } from '../thunk/dispatch';

export function useAutoUpdater(): () => void {
  const ipcRenderer = useIpcRenderer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    ipcRenderer.send('check-for-update');
    ipcRenderer.on('update-downloaded', () => {
      dispatch(updateAvailable());
    });
    return () => {
      ipcRenderer.removeAllListeners('update-downloaded');
    };
  }, [dispatch, ipcRenderer]);

  return () => ipcRenderer.send('do-update');
}
