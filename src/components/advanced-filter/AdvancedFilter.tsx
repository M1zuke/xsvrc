import { Add } from '@mui/icons-material';
import { isEqual } from 'lodash';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MultipleChoiceComboBox, MultipleChoiceOption } from '../combo-box/MultipleChoiceComboBox';
import { AdvancedFilterConfig, ContentFilter, FilterConfig, VisibleFilter } from './advanced-filter-types';
import styles from './AdvancedFilter.module.scss';

export function useAdvancedFilter<T>({ config, id }: AdvancedFilterConfig<T>): [ContentFilter<T>[], ReactElement] {
  const initialConfig = useRef(config);
  const [currentConfig, setCurrentConfig] = useState(config);
  const [visibleFilter, setVisibleFilter] = useState<VisibleFilter<T>>(
    Object.assign({}, ...config.map((fi) => ({ [fi.key]: !!fi.show }))),
  );

  const changeVisibleFilter = useCallback((options: MultipleChoiceOption[]) => {
    setVisibleFilter({
      ...Object.assign({}, ...options.map((fi) => ({ [fi.value]: !!fi.active }))),
    });
  }, []);

  const changeConfigOptions = useCallback(
    (key: FilterConfig<T>['key']) => (options: MultipleChoiceOption[]) => {
      setCurrentConfig([
        ...currentConfig.map((fi) => {
          if (key === fi.key) {
            return {
              ...fi,
              options: options,
            };
          }
          return fi;
        }),
      ]);
    },
    [currentConfig],
  );

  useEffect(() => {
    if (!isEqual(initialConfig.current, config)) {
      initialConfig.current = config;
      setCurrentConfig([
        ...currentConfig.map((fi) => {
          const newOptions = config.find((f) => fi.key === f.key)?.options ?? [];
          return {
            ...fi,
            options: newOptions.map((fo) => {
              const newOptionEntry = fi.options.find((o) => o.value === fo.value);
              return {
                ...fo,
                ...newOptionEntry,
              };
            }),
          };
        }),
      ]);
    }
  }, [config, currentConfig]);

  return useMemo(() => {
    const contentFilter: ContentFilter<T>[] = currentConfig.map((fi) => {
      return {
        key: fi.key,
        filter: fi.options.filter((o) => o.active).map((o) => o.value),
      };
    });

    const addOptions = Object.keys(visibleFilter).map((key) => {
      const k = key as keyof T;
      return {
        notChangeable: currentConfig.find((fi) => fi.key === k)?.show ?? false,
        value: k.toString(),
        active: visibleFilter[k],
        label: currentConfig.find((fi) => fi.key === k)?.label ?? '',
      } as MultipleChoiceOption;
    });

    const gridStyle = {
      gridTemplateColumns: `repeat(${currentConfig.length + 1}, minmax(min-content, max-content))`,
    };
    const jsxElement = (
      <div key={`Advanced-Filter-${id}`} className={styles.AdvancedFilter} style={gridStyle}>
        {currentConfig
          .filter((fi) => visibleFilter[fi.key])
          .map((fi) => {
            return (
              <MultipleChoiceComboBox
                showChosenOptions
                key={`Advanced-Filter-${fi.key}`}
                options={fi.options}
                onChange={changeConfigOptions(fi.key)}
                searchPlaceholder={`Search ${fi.label}`}
              >
                {fi.label}
              </MultipleChoiceComboBox>
            );
          })}

        <MultipleChoiceComboBox options={addOptions} onChange={changeVisibleFilter}>
          <Add />
        </MultipleChoiceComboBox>
      </div>
    );

    return [contentFilter, jsxElement];
  }, [changeConfigOptions, changeVisibleFilter, currentConfig, id, visibleFilter]);
}
