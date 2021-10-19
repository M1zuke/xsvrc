import { useCallback, useMemo } from 'react';
import { useSettings } from '../../../common/use-settings';
import { setSettings } from '../../../store/persisted/actions';
import { Localizations, Settings } from '../../../store/persisted/state';
import { useAppDispatch } from '../../../thunk/dispatch';
import { SettingsOptions } from './types';

type DispatchSettingsHandler<K extends keyof Settings = keyof Settings> = (key: K, value: Settings[K]) => void;

export function useSettingsOptions(): SettingsOptions {
  const settings = useSettings();
  const dispatch = useAppDispatch();

  const dispatchChanges = useCallback<DispatchSettingsHandler>(
    (key, value) => dispatch(setSettings({ [key]: value })),
    [dispatch],
  );

  return useMemo<SettingsOptions>(
    () => ({
      localization: {
        type: 'dropdown',
        changeHandler: (value) => dispatchChanges('localization', value),
        options: [...Localizations],
        value: settings.localization,
      },
      use12hours: {
        type: 'checkbox',
        value: settings.use12hours,
        changeHandler: (value) => dispatchChanges('use12hours', value),
      },
    }),
    [dispatchChanges, settings.localization, settings.use12hours],
  );
}
