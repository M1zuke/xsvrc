import { Settings } from '../../../store/persisted/state';

type SettingsChangeHandler<P extends keyof Settings> = (value: Settings[P]) => void;

export type SettingsOptions = {
  [P in keyof Settings]: AllOptions<P>;
};

type Options<P extends keyof Settings> = {
  changeHandler: SettingsChangeHandler<P>;
  value: Settings[P];
};

type AllOptions<P extends keyof Settings> = DropDownOption<P> | CheckBoxOptions<P>;

type DropDownOption<P extends keyof Settings> = Options<P> & {
  type: 'dropdown';
  options: string[];
};

type CheckBoxOptions<P extends keyof Settings> = Options<P> & {
  type: 'checkbox';
};
