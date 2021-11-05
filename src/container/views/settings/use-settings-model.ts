import { useMemo } from 'react';
import { useSettings } from '../../../common/use-settings';
import { setSettings } from '../../../store/persisted/actions';
import { Localizations, SettingsState } from '../../../store/persisted/state';
import { setI18N } from '../../../store/view/actions';
import { useAppDispatch } from '../../../thunk/dispatch';
import { SettingsOptions } from './types';

type DispatchSettingsHandler<K extends keyof SettingsState = keyof SettingsState> = (value: SettingsState[K]) => void;
type ChangeHandler = {
  [P in keyof SettingsState]: DispatchSettingsHandler<P>;
};

export function useSettingsOptions(): SettingsOptions {
  const { settings } = useSettings();
  const dispatch = useAppDispatch();

  const dispatchChanges = useMemo<ChangeHandler>(() => {
    return {
      localization: (value) => {
        dispatch(setI18N(value));
        dispatch(setSettings({ localization: value }));
      },
      use12hours: (value) => dispatch(setSettings({ use12hours: value })),
    };
  }, [dispatch]);

  return useMemo<SettingsOptions>(
    () => ({
      localization: {
        label: 'Language',
        type: 'dropdown',
        changeHandler: dispatchChanges.localization,
        options: Localizations.map((local) => ({
          value: local,
          label: local,
        })),
        value: settings.localization,
      },
      use12hours: {
        label: 'Use 12 hours clock',
        type: 'checkbox',
        value: settings.use12hours,
        changeHandler: dispatchChanges.use12hours,
      },
    }),
    [dispatchChanges, settings.localization, settings.use12hours],
  );
}
