import { MultipleChoiceOption } from '../combo-box/MulipleChoiceComboBox';

export type AdvancedFilterConfig<T> = {
  id: string;
  config: FilterConfig<T>[];
};

export type ContentFilter<T, K extends keyof T = keyof T> = {
  key: K;
  filter: string[];
};

export type FilterConfig<T, K extends keyof T = keyof T> = {
  label: string;
  key: K;
  show?: boolean;
  searchFilter?: string;
  options: MultipleChoiceOption[];
};

export type VisibleFilter<T, K extends keyof T = keyof T> = {
  [P in K]: boolean;
};
