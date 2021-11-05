import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from '../store/persisted/selectors';
import { SettingsState } from '../store/persisted/state';
import { setI18N } from '../store/view/actions';
import { useAppDispatch } from '../thunk/dispatch';

type SettingsModule = {
  applySettings: () => void;
  settings: SettingsState;
};

export function useSettings(): SettingsModule {
  const dispatch = useAppDispatch();
  const settings = useSelector(selectSettings);

  const applySettings = useCallback(() => {
    dispatch(setI18N(settings.localization));
  }, [dispatch, settings.localization]);

  return useMemo(
    () => ({
      applySettings,
      settings,
    }),
    [applySettings, settings],
  );
}
