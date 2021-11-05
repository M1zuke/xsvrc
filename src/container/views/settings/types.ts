import { DropDownOptionItem } from '../../../components/drop-down/DropDown';
import { SettingsState } from '../../../store/persisted/state';

export type SettingsChangeHandler<P extends keyof SettingsState> = (value: SettingsState[P]) => void;

export type SettingsOptions = {
  [P in keyof SettingsState]: AllOptions<P>;
};

type Options<P extends keyof SettingsState> = {
  label: string;
  changeHandler: SettingsChangeHandler<P>;
  value: SettingsState[P];
};

type AllOptions<P extends keyof SettingsState> = DropDownOption<P> | CheckBoxOptions<P>;

type DropDownOption<P extends keyof SettingsState> = Options<P> & {
  type: 'dropdown';
  options: DropDownOptionItem[];
  value: string | number;
};

type CheckBoxOptions<P extends keyof SettingsState> = Options<P> & {
  type: 'checkbox';
  value: boolean;
};
